const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '..', 'public');
const supportedExts = ['.jpg', '.jpeg', '.png', '.webp'];

function createPlaceholders(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            createPlaceholders(fullPath);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (supportedExts.includes(ext)) {
                const baseName = path.basename(file, ext);
                const outputFile = path.join(dir, `${baseName}-placeholder.webp`);

                if (fs.existsSync(outputFile)) {
                    console.log(`ℹ️  Skipping existing placeholder: ${outputFile}`);
                    return;
                }

                sharp(fullPath)
                    .resize({
                        width: 10,
                        fit: "inside",
                        withoutEnlargement: true,
                    })
                    .webp({
                        quality: 5,
                        nearLossless: false,
                        effort: 0,
                    })
                    .toBuffer()
                    .then(buffer => {
                        fs.writeFileSync(outputFile, buffer);
                        console.log(`Created placeholder: ${baseName}-placeholder.webp (${buffer.length} bytes)`);
                    })
                    .catch(err => {
                        console.error(`Failed to process: ${file}`, err);
                    });
            }
        }
    });
}

console.log('🔄 Creating image placeholders in:', inputDir);
createPlaceholders(inputDir);