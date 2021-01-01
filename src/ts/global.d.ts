export { };

declare global {
    interface ArrayConstructor {
        isArray(arg: ReadonlyArray<any> | any): arg is ReadonlyArray<any>;
    }

    interface Array<T> {
        contains(value: T): boolean;
        weakContains<T2>(value: T2): boolean;
    }

    interface ReadonlyArray<T> {
        contains(value: T): boolean;
        weakContains<T2>(value: T2): boolean;
    }
}
