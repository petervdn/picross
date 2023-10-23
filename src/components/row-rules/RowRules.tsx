import styles from './RowRules.module.css';
import { useGameStore } from '@/store/game.store';
import classNames from 'classnames';
import { getPositionsForRules } from '@/utils/game.utils';

type Props = {
  row: number;
};

export function RowRules({ row }: Props) {
  const gameStore = useGameStore();
  const rules = gameStore.rules.rows[row] ?? [];
  const numberOfRows = useGameStore(({ numberOfRows }) => numberOfRows);

  return (
    <div className={styles.rules}>
      {rules.map((rule, index) => (
        <div key={index} className={styles.rule}>
          {rule}
        </div>
      ))}
      <div className={classNames(styles.rule, styles.options)}>
        {getPositionsForRules({ rules: rules ?? [], length: numberOfRows }).length}
      </div>
    </div>
  );
}
