import { computed } from "vue";

let debounceTimer: ReturnType<typeof setTimeout> | undefined;

export function debounce(func: () => void, delay: number): () => void {
    return function (): void {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(func, delay);
    };
}



interface Navigator {
	msMaxTouchPoints?: number;
}

export const isTouchDevice = computed(() => {
	return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || ((navigator as any).msMaxTouchPoints > 0);
})