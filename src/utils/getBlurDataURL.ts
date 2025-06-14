import { getPlaiceholder } from "plaiceholder";

const blurCache = new Map<string, string>();

export async function getBlurDataURL(imgSrc: string): Promise<string | undefined> {
    if (blurCache.has(imgSrc)) {
        return blurCache.get(imgSrc);
    }

    try {
        const response = await fetch(imgSrc, {
            headers: {
                'Cache-Control': 'public, max-age=31536000, immutable'
            }
        });

        if (!response.ok) {
            console.warn(`Failed to fetch image: ${imgSrc}`);
            return undefined;
        }

        const buffer = Buffer.from(await response.arrayBuffer());
        const { base64 } = await getPlaiceholder(buffer, {
            size: 10
        });

        blurCache.set(imgSrc, base64);

        return base64;
    } catch (error) {
        console.warn(`Failed to generate blur data URL for ${imgSrc}:`, error);
        return undefined;
    }
}

export function clearBlurCache() {
    blurCache.clear();
}