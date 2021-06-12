export const LevelMin = 1;
export const LevelMax = 90;
export const LevelStep = [20, 40, 50, 60, 70, 80];
export const LevelRange = [1, 20, 40, 50, 60, 70, 80, 90];

export type Level = {
  level: number;
  index: number;
};

export function parseLevel(level: string): Level {
  if (0 < level.indexOf("+")) {
    const lv = parseInt(level.replace("+", ""));
    return { level: lv, index: LevelStep.indexOf(lv) + 1 };
  } else {
    const lv = parseInt(level);
    for (let i = 0, len = LevelStep.length; i < len; ++i) {
      if (lv <= LevelStep[i]) {
        return { level: lv, index: i };
      }
    }
    return { level: lv, index: LevelStep.length };
  }
}

export function calc14(level: string, param: readonly number[]): number {
  if (param.length !== 14) throw `unsupported range(${param.length})`;
  const bound = LevelRange;
  const step = parseLevel(level);
  const min = bound[step.index];
  const max = bound[step.index + 1];
  const lower = param[step.index * 2];
  const upper = param[step.index * 2 + 1];
  if (step.level === min) {
    return lower;
  }
  if (step.level === max) {
    return upper;
  }
  return (upper - lower) / (max - min) * (step.level - min) + lower;
}

export function calc8(level: string, param: readonly number[]): number {
  if (param.length !== 8) throw `unsupported range(${param.length})`;
  const bound = LevelRange;
  const step = parseLevel(level);
  const min = bound[step.index];
  const max = bound[step.index + 1];
  const lower = param[step.index];
  const upper = param[step.index + 1];
  if (step.level === min) {
    return lower;
  }
  if (step.level === max) {
    return upper;
  }
  return (upper - lower) / (max - min) * (step.level - min) + lower;
}
