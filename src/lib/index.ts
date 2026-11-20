// place files you want to import through the `#lib` alias in this folder.
export function slugify(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}


export function isSafeReturnUrl(value: string | null): value is string {
	return !!value &&
		value.startsWith('/') &&
		!value.startsWith('//') &&
		!value.includes('\\');
}
