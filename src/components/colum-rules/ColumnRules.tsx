import styles from './ColumnRules.module.css';
import { ColumnRulesItem } from '@/components/colum-rules/ColumnRulesItem';
import { useGameDefinition } from '@/utils/hooks/useGameDefinition';

export function ColumnRules() {
  const { numberOfColumns } = useGameDefinition();

  return (
    <div className={styles.wrap}>
      {Array.from({ length: numberOfColumns }).map((_, index) => (
        <ColumnRulesItem columnIndex={index} key={index} />
      ))}
    </div>
  );
}
