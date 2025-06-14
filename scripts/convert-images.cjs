const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '..', 'public');
const outputDir = path.join(__dirname, '..', 'optimized');
const supportedExts = ['.jpg', '.jpeg', '.png', '.webp'];

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function convertAndMoveImages(inputPath, outputPath) {
    fs.readdirSync(inputPath).forEach(file => {
        const fullInputPath = path.join(inputPath, file);
        const stat = fs.statSync(fullInputPath);

        if (stat.isDirectory()) {
            const nestedOutputPath = path.join(outputPath, file);
            ensureDir(nestedOutputPath);
            convertAndMoveImages(fullInputPath, nestedOutputPath);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (supportedExts.includes(ext)) {
                const baseName = path.basename(file, ext);
                const outputFile = path.join(outputPath, `${baseName}.webp`);

                sharp(fullInputPath)
                    .webp()
                    .toFile(outputFile)
                    .then(() => {
                        const originalSize = fs.statSync(fullInputPath).size;
                        const newSize = fs.statSync(outputFile).size;
                        const saved = (((originalSize - newSize) / originalSize) * 100).toFixed(1);

                        console.log(`Converted: ${file} → ${baseName}.webp (${saved}% smaller)`);
                    })
                    .catch(err => console.error(`Failed to convert: ${file}`, err));
            }
        }
    });
}

console.log('🔄 Converting and moving images...');
ensureDir(outputDir);
convertAndMoveImages(inputDir, outputDir);