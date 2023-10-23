import styles from './RowRules.module.css';
import { useGameStore } from '@/store/game.store';
import classNames from 'classnames';
import { getPositionsForRules } from '@/utils/game.utils';
import { useMemo } from 'react';

type Props = {
  row: number;
};

export function RowRules({ row }: Props) {
  const gameStore = useGameStore();
  const rules = useMemo(() => gameStore.rules.rows[row] ?? [], [gameStore.rules.rows, row]);
  const numberOfRows = useGameStore(({ numberOfRows }) => numberOfRows);

  const permutations = useMemo(
    () => getPositionsForRules({ rules: rules ?? [], length: numberOfRows }),
    [numberOfRows, rules],
  );

  return (
    <div className={styles.rules}>
      {rules.map((rule, index) => (
        <div key={index} className={styles.rule}>
          {rule}
        </div>
      ))}
      <div className={classNames(styles.rule, styles.options)}>{permutations.length}</div>
    </div>
  );
}
