/**
 * Generates favicon set from scripts/icon-source.png (32×32 PNG with transparency).
 * Outputs to app/: favicon.ico, icon.png, icon-192.png, apple-icon.png.
 * Uses nearest-neighbor resize for pixel-art sharpness; PNG compression without quality loss.
 */
import { readFile, writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const srcPath = join(root, "scripts", "icon-source.png");
const appDir = join(root, "app");

const sizes = [
  { name: "icon.png", size: 32 },
  { name: "icon-192.png", size: 192 },
  { name: "apple-icon.png", size: 180 },
];

async function main() {
  await mkdir(appDir, { recursive: true });
  const input = await sharp(srcPath)
    .ensureAlpha()
    .png({ compressionLevel: 6, palette: false });

  const metadata = await input.metadata();
  if (metadata.width !== 32 || metadata.height !== 32) {
    console.warn("Expected 32×32 source; got", metadata.width, "×", metadata.height);
  }

  for (const { name, size } of sizes) {
    const outPath = join(appDir, name);
    await input
      .clone()
      .resize(size, size, { kernel: sharp.kernel.nearest })
      .png({ compressionLevel: 6 })
      .toFile(outPath);
    console.log("Wrote", name, `(${size}×${size})`);
  }

  const png32 = await input
    .clone()
    .resize(32, 32, { kernel: sharp.kernel.nearest })
    .png({ compressionLevel: 6 })
    .toBuffer();
  const ico = await toIco([png32], { resize: false });
  await writeFile(join(appDir, "favicon.ico"), ico);
  console.log("Wrote favicon.ico (32×32)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
