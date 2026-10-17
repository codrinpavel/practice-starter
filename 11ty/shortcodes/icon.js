import fs from "node:fs";
import path from "node:path";

export default function (name, className = "") {
  const iconPath = path.resolve(
    "src/assets/svg/system/icon",
    `${name}.svg`
  );

  if (!fs.existsSync(iconPath)) {
    throw new Error(`Icon "${name}" not found.`);
  }

  let svg = fs.readFileSync(iconPath, "utf8");

  if (className) {
    svg = svg.replace(/<svg\b([^>]*)>/, (match, attrs) => {
      if (/\bclass=/.test(attrs)) {
        return `<svg${attrs.replace(
          /\bclass=(["'])(.*?)\1/,
          (_, quote, existing) =>
            `class=${quote}${existing} ${className}${quote}`
        )}>`;
      }

      return `<svg class="${className}"${attrs}>`;
    });
  }

  return svg;
}