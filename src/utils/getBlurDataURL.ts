import sharp from "sharp";

const blurCache = new Map<string, string>();

export async function getBlurDataURL(imgSrc: string): Promise<string | undefined> {
    // Return cached if available
    if (blurCache.has(imgSrc)) {
        return blurCache.get(imgSrc);
    }

    try {
        const response = await fetch(imgSrc, {
            headers: { 'Cache-Control': 'public, max-age=31536000, immutable' },
        });
        if (!response.ok) {
            console.warn(`Failed to fetch image: ${imgSrc}`);
            return undefined;
        }

        const buffer = Buffer.from(await response.arrayBuffer());

        const thumb = await sharp(buffer)
        .resize(10, 10)
        .blur(20)
        .toFormat("webp")
        .toBuffer();

        const base64 = `data:image/webp;base64,${thumb.toString("base64")}`;
        blurCache.set(imgSrc, base64);

        return base64;
    } catch (error) {
        console.warn(`Failed to generate blur data URL for ${imgSrc}:`, error);
        return undefined;
    }
}