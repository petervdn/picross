import styles from '@/components/colum-rules/ColumnRules.module.css';
import classNames from 'classnames/bind';
import { useLayoutStore } from '@/store/layout.store';
import { useRowOrColumn } from '@/utils/hooks/useRowOrColumn';

type Props = {
  columnIndex: number;
};

let cx = classNames.bind(styles);

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

  return (
    <div
      className={cx('column', { invalid: state === 'invalid' })}
      key={columnIndex}
      style={{ width: boardItemSize + 2 * boardItemMargin }}
    >
      {rules?.map((rule, index) => (
        <div key={index} className={styles.item}>
          {rule}
        </div>
      ))}
      <div className={cx('item', 'options')}>{permutations?.length}</div>
    </div>
  );
}
