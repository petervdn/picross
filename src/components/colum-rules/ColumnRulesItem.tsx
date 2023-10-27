import styles from '@/components/colum-rules/ColumnRules.module.css';
import classNames from 'classnames';
import { useLayoutStore } from '@/store/layout.store';
import { useRowOrColumn } from '@/utils/hooks/useRowOrColumn';
import { Rule } from '@/components/rule/Rule';
import { useUiStore } from '@/store/ui.store';

type Props = {
  columnIndex: number;
};

export function ColumnRulesItem({ columnIndex }: Props) {
  const { rules, permutations, state } = useRowOrColumn({
    index: columnIndex,
    type: 'column',
  });
  const { boardItemSize, boardItemMargin } = useLayoutStore(
    ({ boardItemSize, boardItemMargin }) => ({
      boardItemSize,
      boardItemMargin,
    }),
  );

  const { showPermutations } = useUiStore(({ showPermutations }) => ({ showPermutations }));

  return (
    <div
      className={styles.column}
      key={columnIndex}
      style={{ width: boardItemSize + 2 * boardItemMargin }}
    >
      {rules?.map((rule, index) => (
        <div key={index} className={styles.item}>
          <Rule rule={rule} state={state} />
        </div>
      ))}
      {showPermutations && (
        <div className={classNames(styles.item, styles.options)}>{permutations?.length}</div>
      )}
    </div>
  );
}
