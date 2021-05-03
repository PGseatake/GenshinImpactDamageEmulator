import { IArtifactData } from "~/src/interface";

export { };

declare global {
    interface ArrayConstructor {
        isArray(arg: ReadonlyArray<any> | any): arg is ReadonlyArray<any>;
    }
}

export type GideData = {
    artifact: IArtifactData[];
};

declare module "vue/types/vue" {
    interface Vue {
        $isReleaseLeaf: (obj: any) => boolean;
        $uniqueId: () => string;
        $gideData: GideData;
    }
}
