export const Maths = {
    clamp(val: number, min: number, max: number) {
        return val < min ? min : (val > max ? max : val);
    },
    lerp(x0: number, x1: number, ratio: number) {
        return x0 * (1 - ratio) + x1 * ratio;
    },
    rate(value: number) {
        // 小数点以下 = value < 1.0: 2桁 / value < 100: 1桁 / 他: 0桁
        const frac = Math.max(0, value < 100 ? (value < 1 ? 2 : 1) : 0);
        const scale = Math.pow(10, frac);
        return (Math.round(value * scale) / scale).toFixed(frac) + "%";
    },
};

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
            return value[Maths.clamp(talent, 1, value.length) - 1];
        }
        return value;
    },
};
