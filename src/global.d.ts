import { IArtifactData } from "~/src/interface";

export { };

declare global {
    interface ArrayConstructor {
        isArray(arg: ReadonlyArray<any> | any): arg is ReadonlyArray<any>;
    }

    type ReadonlyRecord<K extends keyof any, T> = {
        readonly [P in K]: T;
    };

    type Arrayable<T> = T | T[];
    type ReadonlyArrayable<T> = T | ReadonlyArray<T>;

    interface IMap<T> {
        [key: string]: T;
        [key: number]: T;
    }

    interface IReadonlyMap<T> {
        readonly [key: string]: T;
        readonly [key: number]: T;
    }
}

export type GideData = {
    artifact: IArtifactData[];
};

declare module "vue/types/vue" {
    interface Vue {
        $uniqueId: () => string;
        $gideData: GideData;
    }
}
