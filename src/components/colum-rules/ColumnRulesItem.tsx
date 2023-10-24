import styles from '@/components/colum-rules/ColumnRules.module.css';
import classNames from 'classnames';
import { getPositionsForRules } from '@/utils/game.utils';
import { useGameStore } from '@/store/game.store';
import { useLayoutStore } from '@/store/layout.store';
import { useMemo } from 'react';

type Props = {
  column: number;
};

export function ColumnRulesItem({ column }: Props) {
  const rulesByColumn = useGameStore(({ rules }) => rules.columns);
  const numberOfColumns = useGameStore(({ numberOfColumns }) => numberOfColumns);
  const rules = useMemo(() => rulesByColumn[column], [column, rulesByColumn]);
  const { boardItemSize, boardItemMargin } = useLayoutStore(
    ({ boardItemSize, boardItemMargin }) => ({
      boardItemSize,
      boardItemMargin,
    }),
  );
  const permutations = useMemo(
    () => getPositionsForRules({ rules: rules ?? [], length: numberOfColumns }),
    [numberOfColumns, rules],
  );

  return (
    <div
      className={styles.column}
      key={column}
      style={{ width: boardItemSize + 2 * boardItemMargin }}
    >
      {rules?.map((rule, index) => (
        <div key={index} className={styles.item}>
          {rule}
        </div>
      ))}
      <div className={classNames(styles.item, styles.options)}>{permutations?.length}</div>
    </div>
  );
}
