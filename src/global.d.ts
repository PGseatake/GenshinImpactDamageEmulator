import { LocaleObject } from "nuxt-i18n";
import { IVueI18n } from "vue-i18n/types";
import { ElementType } from "~/src/const";
import { BonusValue, IIdentify } from "~/src/interface";
import { Database } from "~/src/convert";
import { BonusBase } from "~/src/bonus";

export { };

declare global {
    interface ArrayConstructor {
        isArray(arg: ReadonlyArray<any> | any): arg is ReadonlyArray<any>;
    }

    type ReadonlyRecord<K extends keyof any, T> = {
        readonly [P in K]: T;
    };

    type ReadonlyPartial<T> = {
        readonly [P in keyof T]?: T[P];
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
        $db: Database;
        $bonuses: IDict<BonusBase>;
        $makeUniqueId: () => string;
        $appendData: (data: IIdentify[], item: IIdentify) => void;
        $removeData: (data: IIdentify[], item: IIdentify) => void;
        $formatBonus: (i18n: IVueI18n, data: BonusValue | undefined) => string;
        $starColor: (star: number) => string;
        $elementBGColor: (elem: ElementType) => string;
        $roundRate: (value: number) => string;
        $roundFloat: (value: number) => string;
    }
}

declare module "vue-i18n/types" {
    interface IVueI18n {
        locales: LocaleObject[];
    }
}
