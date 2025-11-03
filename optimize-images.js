#!/usr/bin/env node

import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, "assets", "images");
const outputDir = path.join(__dirname, "assets", "images", "optimized");

const IMAGE_QUALITY = 85;
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 80;

// Função para optimização de imagens
async function optimizeImages() {
  if (!fs.existsSync(assetsDir)) {
    console.log("Diretório assets/images não encontrado");
    return;
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(assetsDir).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
  });

  if (files.length === 0) {
    console.log("Nenhuma imagem encontrada para otimizar");
    return;
  }

  console.log(`Otimizando ${files.length} imagens...\n`);

  for (const file of files) {
    const inputPath = path.join(assetsDir, file);
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);

    const metadata = await sharp(inputPath).metadata();
    const originalSize = fs.statSync(inputPath).size;

    const image = sharp(inputPath);

    if (metadata.width > MAX_WIDTH) {
      image.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: "inside",
      });
    }

    const jpegPath = path.join(outputDir, `${baseName}.jpg`);
    await image
      .jpeg({ quality: IMAGE_QUALITY, progressive: true })
      .toFile(jpegPath);
    const jpegSize = fs.statSync(jpegPath).size;

    const webpPath = path.join(outputDir, `${baseName}.webp`);
    await sharp(inputPath)
      .resize(metadata.width > MAX_WIDTH ? MAX_WIDTH : null)
      .webp({ quality: WEBP_QUALITY })
      .toFile(webpPath);
    const webpSize = fs.statSync(webpPath).size;

    const jpegReduction = ((1 - jpegSize / originalSize) * 100).toFixed(1);
    const webpReduction = ((1 - webpSize / originalSize) * 100).toFixed(1);

    console.log(`✓ ${file}`);
    console.log(
      `  JPEG: ${(originalSize / 1024).toFixed(1)} KB → ${(
        jpegSize / 1024
      ).toFixed(1)} KB (${jpegReduction}% menor)`
    );
    console.log(
      `  WebP: ${(originalSize / 1024).toFixed(1)} KB → ${(
        webpSize / 1024
      ).toFixed(1)} KB (${webpReduction}% menor)\n`
    );
  }
}

optimizeImages().catch((err) => {
  process.exit(1);
});
