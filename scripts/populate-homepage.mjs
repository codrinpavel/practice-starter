
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();

const JSON_FILE = path.join(ROOT, "modules.json");
const HOMEPAGE = path.join(ROOT, "src/pages/index.liquid");

try {
  // Read exported assembler data.
  const data = JSON.parse(await fs.readFile(JSON_FILE, "utf8"));

  const modules = data.pages?.home;
  const validName = /^[a-zA-Z0-9_-]+$/;

  if (
    data.version !== 1 ||
    !Array.isArray(modules) ||
    !modules.length ||
    !modules.every(
      (item) =>
        validName.test(item?.category ?? "") &&
        validName.test(item?.module ?? "")
    )
  ) {
    throw new Error("Invalid or empty modules.json");
  }

  // Verify every imported Liquid module exists.
  for (const { module } of modules) {
    await fs.access(
      path.join(ROOT, "src/includes/modules", `${module}.liquid`)
    );
  }

  // Read the existing homepage.
  const homepage = await fs.readFile(HOMEPAGE, "utf8");

  // Generate includes in assembler order.
  const includes = modules
    .map(({ module }) => `{% include 'modules/${module}' %}`)
    .join("\n");

  // Append includes without modifying existing content.
  const output = `${homepage.trimEnd()}\n\n${includes}\n`;

  await fs.writeFile(HOMEPAGE, output, "utf8");

  console.log(`Populated homepage with ${modules.length} modules.`);
} catch (error) {
  console.error(`Failed to populate homepage: ${error.message}`);
  process.exitCode = 1;
}
