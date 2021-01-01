if (!Array.prototype.contains) {
    Array.prototype.contains = function <T>(value: T): boolean {
        for (const v of this as readonly T[]) {
            if (v === value) return true;
        }
        return false;
    };

    Array.prototype.weakContains = function <T extends T2, T2>(value: T2): boolean {
        for (const v of this as readonly T[]) {
            if (v == value) return true;
        }
        return false;
    };
}
