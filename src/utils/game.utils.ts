import { GameConfig } from '@/types/misc.types';

export function getMaxAmountOfRules(gameConfig: GameConfig) {
  return {
    horizontal: gameConfig.rows.rules.reduce((acc, rules) => {
      return Math.max(acc, rules.length);
    }, 0),
    vertical: gameConfig.columns.rules.reduce((acc, rules) => {
      return Math.max(acc, rules.length);
    }, 0),
  };
}
