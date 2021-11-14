export const Arrayable = {
    from<T>(value: ReadonlyArrayable<T>) {
        return Array.isArray(value) ? value : [value];
    },
    clamp(value: ReadonlyArrayable<number>, talent: number) {
        if (Array.isArray(value)) {
            return value[Math.min(Math.max(1, talent), value.length) - 1];
        }
        return value;
    }
};
