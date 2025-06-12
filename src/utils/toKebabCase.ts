export function toKebabCase(input: string): string {
    return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-_]/g, "")
        .replace(/[\s_]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
}