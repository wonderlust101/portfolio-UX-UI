export function getPlaceholderUrl(imageUrl: string): string {
    // Ensure the path starts with a single leading slash
    const normalizedPath = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;

    // Replace file extension with '-placeholder.webp'
    return normalizedPath.replace(/(\.\w+)$/, '-placeholder.webp');
}