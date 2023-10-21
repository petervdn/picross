import { GameConfig, GameState } from '@/types/misc.types';
import styles from './ColumnRules.module.css';
import { useGameStore } from '@/store/game.store';
import { useLayoutStore } from '@/store/layout.store';

export function ColumnRules() {
  const itemSize = useLayoutStore(({ boardItemSize }) => boardItemSize);
  const rulesByColumn = useGameStore(({ rules }) => rules.columns);
  const { numberOfColumns } = useGameStore();

  return (
    <div className={styles.wrap}>
      {Array.from({ length: numberOfColumns }).map((_, column) => {
        const a = 1;
        const rules = rulesByColumn[column];
        return (
          <div className={styles.column} key={column} style={{ width: itemSize }}>
            {rules?.map((rule, index) => (
              <div key={index} className={styles.item}>
                {rule}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
