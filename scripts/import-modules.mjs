/**
 * This is set up as a package.json script called "import"
 * 
 * Usage
 * 
 * npm run import modules
 * where "modules" is the name of the .json file exported by the assembler
 */


import fs from "node:fs/promises";
import path from "node:path";

const SOURCE_DIR =
  "C:\\www\\module-foundry\\module-foundry-public\\src\\includes\\modules";

const CLIENT_DIR = process.cwd();

const LIQUID_DIR = path.join(
  CLIENT_DIR,
  "src/includes/modules"
);

const SCSS_DIR = path.join(
  CLIENT_DIR,
  "src/assets/sass/03.modules"
);

const SCSS_INDEX = path.join(SCSS_DIR, "index.scss");

const jsonFile = `${process.argv[2]}.json`;

if (!jsonFile) {
  console.error("Usage: node scripts/import-modules.mjs <json-file>");
  process.exit(1);
}

// Read and validate the exported layout.
const data = JSON.parse(
  await fs.readFile(path.resolve(jsonFile), "utf8")
);

const validName = /^[a-zA-Z0-9_-]+$/;

if (
  data.version !== 1 ||
  !Array.isArray(data.pages?.home) ||
  !data.pages.home.every(
    (item) =>
      validName.test(item?.category ?? "") &&
      validName.test(item?.module ?? "")
  )
) {
  throw new Error("Invalid assembler JSON");
}

// Deduplicate modules while preserving their order.
const modules = [
  ...new Map(
    data.pages.home.map((item) => [
      `${item.category}/${item.module}`,
      item,
    ])
  ).values(),
];

// Prevent filename collisions across categories.
const names = new Map();

for (const { category, module } of modules) {
  const existing = names.get(module);

  if (existing && existing !== category) {
    throw new Error(
      `Filename collision: ${existing}/${module} and ${category}/${module}`
    );
  }

  names.set(module, category);
}

// Validate source files before importing.
const files = [];

for (const { category, module } of modules) {
  const moduleDir = path.join(
    SOURCE_DIR,
    category,
    module
  );

  const liquid = path.join(moduleDir, `${module}.liquid`);
  const scss = path.join(moduleDir, `${module}.scss`);

  // Liquid is required.
  await fs.access(liquid);

  const entry = {
    module,
    liquid,
    scss: null,
  };

  // SCSS is optional.
  try {
    await fs.access(scss);
    entry.scss = scss;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  files.push(entry);
}

// Prepare destination directories.
await fs.mkdir(LIQUID_DIR, { recursive: true });
await fs.mkdir(SCSS_DIR, { recursive: true });

// Copy files without overwriting existing ones.
async function copyIfMissing(source, destination) {
  try {
    await fs.copyFile(
      source,
      destination,
      fs.constants.COPYFILE_EXCL
    );

    console.log(`Copied: ${path.relative(CLIENT_DIR, destination)}`);
  } catch (error) {
    if (error.code !== "EEXIST") throw error;

    console.log(
      `Skipped (exists): ${path.relative(CLIENT_DIR, destination)}`
    );
  }
}

for (const { module, liquid, scss } of files) {
  await copyIfMissing(
    liquid,
    path.join(LIQUID_DIR, `${module}.liquid`)
  );

  if (scss) {
    await copyIfMissing(
      scss,
      path.join(SCSS_DIR, `${module}.scss`)
    );
  }
}

// Read the existing SCSS index, or create a default.
let index;

try {
  index = await fs.readFile(SCSS_INDEX, "utf8");
} catch (error) {
  if (error.code !== "ENOENT") throw error;

  index = `@use 'sass:meta';

@layer modules {
}
`;
}

// Extract existing Sass imports.
const existingImports = new Set(
  [...index.matchAll(
    /@include\s+meta\.load-css\(\s*["']([^"']+)["']/g
  )].map((match) => match[1])
);

// Only include modules with an SCSS file.
const missing = files
  .filter(({ scss }) => scss)
  .map(({ module }) => module)
  .filter((module) => !existingImports.has(module));

// Add missing imports inside @layer modules.
if (missing.length) {
  const match = /@layer\s+modules\s*\{/.exec(index);

  if (!match) {
    throw new Error(
      'Could not find "@layer modules {" in index.scss'
    );
  }

  const start = match.index + match[0].length;

  let depth = 1;
  let end = -1;

  for (let i = start; i < index.length; i++) {
    if (index[i] === "{") depth++;
    if (index[i] === "}") depth--;

    if (depth === 0) {
      end = i;
      break;
    }
  }

  if (end === -1) {
    throw new Error("Unclosed @layer modules block");
  }

  const before = index.slice(0, end).trimEnd();
  const after = index.slice(end);

  const imports = missing
    .map(
      (module) =>
        `  @include meta.load-css("${module}");`
    )
    .join("\n");

  index = `${before}\n${imports}\n${after}`;

  await fs.writeFile(SCSS_INDEX, index);

  console.log(`Added ${missing.length} Sass imports`);
}

console.log(`Imported ${modules.length} modules successfully.`);

console.log("\nLiquid includes:\n");

console.log(
  data.pages.home
    .map(({ module }) => `{% include 'modules/${module}' %}`)
    .join("\n")
);