const fs = require("fs").promises;
const path = require("path");

async function generateProjectLinks() {
    const caseStudiesDir = path.join(process.cwd(), "src", "case-studies");
    const outputFile = path.join(process.cwd(), "src", "data", "projectLinks.json");

    try {
        const files = await fs.readdir(caseStudiesDir);
        const links = [];

        for (const file of files) {
            if (!file.endsWith(".json")) continue;

            const slug = file.replace(/\.json$/, "");
            const filePath = path.join(caseStudiesDir, file);
            const fileContents = await fs.readFile(filePath, "utf8");
            const data = JSON.parse(fileContents);

            links.push({
                title: data.productName,
                link : `/${slug}`,
                timeline: data.timeline,
                description: data.metadata.description,
                previewImage: data.heroImageTablet,
                theme: data.theme,
                featured: data.featured,
                tags: data.tags,
            });
        }

        await fs.writeFile(
            outputFile,
            JSON.stringify({projectLinks: links}, null, 2),
            "utf8"
        );

        console.log(`Generated ${outputFile}`);
    } catch (err) {
        console.error("Failed to generate projectLinks.json:", err);
    }
}

generateProjectLinks();