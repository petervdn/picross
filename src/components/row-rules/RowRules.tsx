import styles from './RowRules.module.css';
import { useGameStore } from '@/store/game.store';

type Props = {
  row: number;
};

export function RowRules({ row }: Props) {
  const gameStore = useGameStore();
  const rules = gameStore.rules.rows[row] ?? [];

  return (
    <div className={styles.rules}>
      {rules.map((rule, index) => (
        <div key={index} className={styles.rule}>
          {rule}
        </div>
      ))}
    </div>
  );
}
