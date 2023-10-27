import styles from './RowRules.module.css';
import classNames from 'classnames';
import { useRowOrColumn } from '@/utils/hooks/useRowOrColumn';
import { Rule } from '@/components/rule/Rule';
import { useUiStore } from '@/store/ui.store';

type Props = {
  rowIndex: number;
};

export function RowRules({ rowIndex }: Props) {
  const { rules, permutations, state } = useRowOrColumn({ index: rowIndex, type: 'row' });
  const { showPermutations } = useUiStore(({ showPermutations }) => ({ showPermutations }));

  return (
    <div className={styles.rules}>
      {rules?.map((rule, index) => (
        <div key={index} className={styles.rule}>
          <Rule rule={rule} state={state} />
        </div>
      ))}
      {showPermutations && (
        <div className={classNames(styles.rule, styles.options)}>{permutations?.length}</div>
      )}
    </div>
  );
}
