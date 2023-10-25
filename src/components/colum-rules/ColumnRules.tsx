import styles from './ColumnRules.module.css';
import { useGameStore } from '@/store/game.store';
import { ColumnRulesItem } from '@/components/colum-rules/ColumnRulesItem';

export function ColumnRules() {
  const numberOfColumns = useGameStore(({ numberOfColumns }) => numberOfColumns);

  return (
    <div className={styles.wrap}>
      {Array.from({ length: numberOfColumns }).map((_, index) => (
        <ColumnRulesItem columnIndex={index} key={index} />
      ))}
    </div>
  );
}
