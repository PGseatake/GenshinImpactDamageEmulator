export type SettingBoolean = {
    autosave: boolean;
};

export const SettingCritical = {
    Base: "", // 直値
    Expc: "expc", // 期待値
    Both: "both", // 両方
} as const;
export type SettingCritical = typeof SettingCritical[keyof typeof SettingCritical];

export type SettingString = {
    artifact: string;
    critical: string; // SettingCritical
};

export type SettingChara = {
    conste: number;
    level: string;
    combat: number;
    skill: number;
    burst: number;
};

export type SettingWeapon = {
    rank: number;
    level: string;
};

export type SettingArtifact = {
    star: number;
    level: number;
};

export type SettingInitial = {
    initial: {
        chara: SettingChara;
        weapon: SettingWeapon;
        artifact: SettingArtifact;
    };
};

export type DBSetting = {
    setting: SettingBoolean & SettingString & SettingInitial;
};
