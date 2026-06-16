import { copyFileSync, mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";

const parcel = spawnSync("parcel", ["build", "src/index.html", "--public-url", "./"], {
  stdio: "inherit",
});

if (parcel.status !== 0) {
  process.exit(parcel.status ?? 1);
}

mkdirSync("dist", { recursive: true });

for (const [source, target] of [
  ["src/robots.txt", "dist/robots.txt"],
  ["src/sitemap.xml", "dist/sitemap.xml"],
  ["assets/og-image.webp", "dist/og-image.webp"],
]) {
  copyFileSync(source, target);
}
