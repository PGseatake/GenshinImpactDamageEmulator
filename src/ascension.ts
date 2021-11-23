export const LevelMin = 1;
export const LevelMax = 90;
export const LevelStep = [20, 40, 50, 60, 70, 80];
export const LevelRange = [1, 20, 40, 50, 60, 70, 80, 90];

export function parseLevel(strLv?: string): {
  level: number;
  index: number;
} {
  if (strLv) {
    if (0 < strLv.indexOf("+")) {
      const lv = parseInt(strLv.replace("+", ""));
      return { level: lv, index: LevelStep.indexOf(lv) + 1 };
    }
    const lv = parseInt(strLv);
    for (let i = 0, len = LevelStep.length; i < len; ++i) {
      if (lv <= LevelStep[i]) {
        return { level: lv, index: i };
      }
    }
    return { level: lv, index: LevelStep.length };
  }
  return { level: 0, index: 0 };
}

// 汎用
export function calc14(strLv: string, param: readonly number[]): number {
  if (param.length !== 14) throw `unsupported length(${param.length})`;
  const bound = LevelRange;
  const { level, index } = parseLevel(strLv);
  const min = bound[index];
  const lower = param[index * 2];
  if (level <= min) {
    return lower;
  }
  const max = bound[index + 1];
  const upper = param[index * 2 + 1];
  if (level >= max) {
    return upper;
  }
  return (upper - lower) / (max - min) * (level - min) + lower;
}

// 武器追加効果向け
export function calc8(strLv: string, param: readonly number[]): number {
  if (param.length !== 8) throw `unsupported length(${param.length})`;
  const bound = LevelRange;
  const { level, index } = parseLevel(strLv);
  const min = bound[index];
  const lower = param[index];
  const step5 = Math.floor(level / 5) * 5; // レベル5ずつアップ
  if (step5 <= min) {
    return lower;
  }
  const max = bound[index + 1];
  const upper = param[index + 1];
  if (step5 >= max) {
    return upper;
  }
  return (upper - lower) / (max - min) * (step5 - min) + lower;
}

// キャラ固有ステータス向け
export function step8(strLv: string, param: readonly number[]): number {
  if (param.length !== 8) throw `unsupported length(${param.length})`;
  const { index } = parseLevel(strLv);
  return param[index + 1];
}
