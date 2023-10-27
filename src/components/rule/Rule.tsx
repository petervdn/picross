import { RuleState } from '@/types/misc.types';
import classNames from 'classnames/bind';
import styles from './Rule.module.css';

type Props = {
  rule: number;
  state: RuleState;
};

let cx = classNames.bind(styles);

export function Rule({ rule, state }: Props) {
  return (
    <span
      className={cx({
        invalid: state === 'invalid',
        solved: state === 'solved',
      })}
    >
      {rule}
    </span>
  );
}
