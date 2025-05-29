// scripts/convert-images.cjs
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '..', 'public');
const supportedExts = ['.jpg', '.jpeg', '.png'];

function convertImages(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            convertImages(fullPath);
        } else if (supportedExts.includes(path.extname(file).toLowerCase())) {
            const outputFile = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
            sharp(fullPath)
                .toFormat('webp')
                .toFile(outputFile)
                .then(() => console.log(`Converted: ${file} → ${path.basename(outputFile)}`))
                .catch(err => console.error(`Failed: ${file}`, err));
        }
    });
}

convertImages(inputDir);