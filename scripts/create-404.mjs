import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

if (existsSync("dist/index.html")) {
  copyFileSync("dist/index.html", "dist/404.html");

  ["archive", "devlogs", "roadmap"].forEach((slug) => {
    const target = `dist/${slug}/index.html`;
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync("dist/index.html", target);
  });

  [
    "design",
    "index",
    "world",
    "tech",
    "ui",
    "magic",
    "melee",
    "ranged",
    "items",
    "demon-eyes",
    "roadmap"
  ].forEach((slug) => {
    const target = `dist/doc/${slug}/index.html`;
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync("dist/index.html", target);
  });
}
