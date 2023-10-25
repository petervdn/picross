import styles from './RowRules.module.css';
import { useGameStore } from '@/store/game.store';
import classNames from 'classnames';
import { getPositionsForRules } from '@/utils/game.utils';
import { useMemo } from 'react';
import { useRowOrColumn } from '@/utils/hooks/useRowOrColumn';

type Props = {
  rowIndex: number;
};

export function RowRules({ rowIndex }: Props) {
  const { rules, permutations } = useRowOrColumn({ index: rowIndex, type: 'row' });

  return (
    <div className={styles.rules}>
      {rules?.map((rule, index) => (
        <div key={index} className={styles.rule}>
          {rule}
        </div>
      ))}
      <div className={classNames(styles.rule, styles.options)}>{permutations?.length}</div>
    </div>
  );
}
