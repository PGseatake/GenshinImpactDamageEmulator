export type SettingBoolean = {
    autosave: boolean;
};

export type SettingString = {
    artifact: string;
    critical: string;
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
