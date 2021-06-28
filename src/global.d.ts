import { IBonusValueData, IIdentify } from "~/src/interface";
import { GlobalData } from "~/src/convert";
import { ElementType } from "./const";

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

declare module "vue/types/vue" {
    interface Vue {
        $globals: GlobalData;
        $makeUniqueId: () => string;
        $appendData: (data: IIdentify[], item: IIdentify) => void;
        $removeData: (data: IIdentify[], item: IIdentify) => void;
        $formatBonus: (vm: Vue, data: IBonusValueData | undefined) => string;
        $starColor: (star: number) => string;
        $elementBGColor: (elem: ElementType) => string;
    }
}
