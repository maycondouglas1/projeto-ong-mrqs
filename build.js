#!/usr/bin/env node

/*
  Arquivo de BUILD para o projeto
  Copia assets, minifica HTML, etc.
*/
import CleanCSS from "clean-css";
import fs from "fs";
import { minify as minifyHTML } from "html-minifier-terser";
import path from "path";
import { minify as minifyJS } from "terser";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, "dist");
const srcDir = __dirname;

async function cleanDist() {
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true });
  }
  fs.mkdirSync(distDir, { recursive: true });
  console.log("✓ Limpou diretório dist/");
}

async function copyAssets() {
  const assetsDir = path.join(srcDir, "assets");
  const distAssetsDir = path.join(distDir, "assets");

  if (fs.existsSync(assetsDir)) {
    fs.cpSync(assetsDir, distAssetsDir, { recursive: true });
    console.log("✓ Copiou assets/");
  }
}

async function minifyHTMLFiles() {
  const htmlFiles = fs.readdirSync(srcDir).filter((f) => f.endsWith(".html"));

  for (const file of htmlFiles) {
    const content = fs.readFileSync(path.join(srcDir, file), "utf-8");
    const minified = await minifyHTML(content, {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
    });

    fs.writeFileSync(path.join(distDir, file), minified);
    console.log(`✓ Minificou ${file}`);
  }
}

async function minifyCSSFiles() {
  const cssDir = path.join(srcDir, "css");
  const distCssDir = path.join(distDir, "css");
  fs.mkdirSync(distCssDir, { recursive: true });

  const cssFiles = fs.readdirSync(cssDir).filter((f) => f.endsWith(".css"));
  const cleanCSS = new CleanCSS({ level: 2 });

  for (const file of cssFiles) {
    const content = fs.readFileSync(path.join(cssDir, file), "utf-8");
    const output = cleanCSS.minify(content);

    if (output.errors.length > 0) {
      console.error(`Erro ao minificar ${file}:`, output.errors);
      continue;
    }

    fs.writeFileSync(path.join(distCssDir, file), output.styles);
    console.log(`✓ Minificou css/${file}`);
  }
}

async function minifyJSFiles() {
  const jsDir = path.join(srcDir, "js");
  const distJsDir = path.join(distDir, "js");

  function copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        copyDirectory(srcPath, destPath);
      } else if (entry.name.endsWith(".js")) {
        const content = fs.readFileSync(srcPath, "utf-8");
        minifyJS(content, {
          module: true,
          compress: {
            dead_code: true,
            drop_console: false,
            drop_debugger: true,
          },
          mangle: false,
          format: {
            comments: false,
          },
        })
          .then((result) => {
            fs.writeFileSync(destPath, result.code);
            console.log(`✓ Minificou js/${path.relative(jsDir, srcPath)}`);
          })
          .catch((err) => {
            console.error(`Erro ao minificar ${srcPath}:`, err);
            fs.copyFileSync(srcPath, destPath);
          });
      }
    }
  }

  copyDirectory(jsDir, distJsDir);
}

async function generateReport() {
  const getSize = (dir) => {
    let size = 0;
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
      const filePath = path.join(dir, file.name);
      if (file.isDirectory()) {
        size += getSize(filePath);
      } else {
        size += fs.statSync(filePath).size;
      }
    }
    return size;
  };

  const srcSize =
    getSize(srcDir) - (fs.existsSync(distDir) ? getSize(distDir) : 0);
  const distSize = getSize(distDir);
  const reduction = ((1 - distSize / srcSize) * 100).toFixed(2);

  console.log("\n Relatório de Build:");
  console.log(`   Tamanho original: ${(srcSize / 1024).toFixed(2)} KB`);
  console.log(`   Tamanho minificado: ${(distSize / 1024).toFixed(2)} KB`);
  console.log(`   Redução: ${reduction}%\n`);
}

async function build() {
  console.log("🚀 Iniciando build de produção...\n");

  try {
    await cleanDist();
    await copyAssets();
    await minifyHTMLFiles();
    await minifyCSSFiles();
    await minifyJSFiles();

    setTimeout(async () => {
      await generateReport();
      console.log("Build concluído com sucesso!\n");
    }, 1000);
  } catch (error) {
    console.error("Erro durante o build:", error);
    process.exit(1);
  }
}

build();
