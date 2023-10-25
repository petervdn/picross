import styles from './RowRules.module.css';
import classNames from 'classnames/bind';
import { useRowOrColumn } from '@/utils/hooks/useRowOrColumn';

type Props = {
  rowIndex: number;
};

let cx = classNames.bind(styles);

export function RowRules({ rowIndex }: Props) {
  const { rules, permutations, state } = useRowOrColumn({ index: rowIndex, type: 'row' });

  return (
    <div className={cx('rules', { invalid: state === 'invalid' })}>
      {rules?.map((rule, index) => (
        <div key={index} className={styles.rule}>
          {rule}
        </div>
      ))}
      <div className={cx('rule', 'options')}>{permutations?.length}</div>
    </div>
  );
}
