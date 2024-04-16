let debounceTimer: ReturnType<typeof setTimeout> | undefined;

export function debounce(func: () => void, delay: number): () => void {
    return function (): void {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(func, delay);
    };
}
