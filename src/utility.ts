export const Arrayable = {
    make<T>(length: number, mapfn: (_: unknown, i: number) => T) {
        return Array.from({ length }, mapfn);
    },
    from<T>(value: ReadonlyArrayable<T>) {
        return Array.isArray(value) ? value : [value];
    },
    clamp(value: ReadonlyArrayable<number>, talent: number) {
        if (Array.isArray(value)) {
            return value[Math.min(Math.max(1, talent), value.length) - 1];
        }
        return value;
    },
};
