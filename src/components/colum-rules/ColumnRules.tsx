import { GameConfig, GameState } from '@/types/misc.types';
import styles from './ColumnRules.module.css';
import { useGameStore } from '@/store/gameStore';

export function ColumnRules() {
  const { numberOfColumns } = useGameStore();

  return (
    <div className={styles.wrap}>
      {Array.from({ length: numberOfColumns }).map((_, column) => (
        <div className={styles.column} key={column}>
          {column}
        </div>
      ))}
    </div>
  );
}
