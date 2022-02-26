export interface Arrayable {
    make<T>(length: number, mapfn: (_: unknown, i: number) => T): T[];
    from(): undefined;
    from<T>(value?: ReadonlyArrayable<T>): ReadonlyArray<T>;
    clamp<T>(value: ReadonlyArrayable<T>, talent: number): T;
}

export const Arrayable: Arrayable = {
    make<T>(length: number, mapfn: (_: unknown, i: number) => T) {
        return Array.from({ length }, mapfn);
    },
    from<T>(value?: ReadonlyArrayable<T>) {
        if (value) {
            return Array.isArray(value) ? value : [value];
        }
        return undefined as any;
    },
    clamp<T>(value: ReadonlyArrayable<T>, talent: number) {
        if (Array.isArray(value)) {
            return value[Math.min(Math.max(1, talent), value.length) - 1];
        }
        return value;
    },
};
