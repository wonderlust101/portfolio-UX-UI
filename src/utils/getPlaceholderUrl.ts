export function getPlaceholderUrl(imageUrl: string): string {
    // Ensure there's no leading slash
    const cleanPath = imageUrl.replace(/^\/+/, '');

    // Insert `-placeholder` before the file extension
    return '/' + cleanPath.replace(/(\.\w+)$/, '-placeholder.webp');
}