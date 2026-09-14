import { readdir, stat, unlink } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

const dir = join(process.cwd(), "public", "bioVostock");
const renames = {
  "cart (2).png": "cart-2.webp",
};

const files = (await readdir(dir)).filter((f) => f.endsWith(".png"));

for (const file of files) {
  const outName = renames[file] ?? `${parse(file).name}.webp`;
  const input = join(dir, file);
  const output = join(dir, outName);

  const { size: inSize } = await stat(input);
  await sharp(input)
    .webp({ quality: 82 })
    .toFile(output);
  const { size: outSize } = await stat(output);
  await unlink(input);
  console.log(`${file} -> ${outName}  ${(inSize / 1024).toFixed(0)}KB -> ${(outSize / 1024).toFixed(0)}KB`);
}