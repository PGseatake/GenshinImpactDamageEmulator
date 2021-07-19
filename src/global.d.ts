import { IBonusValueData, IIdentify } from "~/src/interface";
import { GlobalData } from "~/src/convert";
import { ElementType } from "./const";
import { BonusBase } from "./bonus";

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

    interface IDict<T> {
        [key: string]: T;
    }
    interface IReadonlyDict<T> {
        readonly [key: string]: T;
    }

    interface IHash<T> {
        [key: number]: T;
    }
    interface IReadonlyHash<T> {
        readonly [key: number]: T;
    }
}

declare module "vue/types/vue" {
    interface Vue {
        $globals: GlobalData;
        $bonuses: IDict<BonusBase>;
        $makeUniqueId: () => string;
        $appendData: (data: IIdentify[], item: IIdentify) => void;
        $removeData: (data: IIdentify[], item: IIdentify) => void;
        $formatBonus: (vm: Vue, data: IBonusValueData | undefined) => string;
        $starColor: (star: number) => string;
        $elementBGColor: (elem: ElementType) => string;
        $roundRate: (value: number) => string;
        $roundFloat: (value: number) => string;
    }
}
