import styles from './ColumnRules.module.css';
import { useGameStore } from '@/store/game.store';
import { useLayoutStore } from '@/store/layout.store';
import { getPositionsForRules } from '@/utils/game.utils';
import classNames from 'classnames';

export function ColumnRules() {
  const itemSize = useLayoutStore(({ boardItemSize }) => boardItemSize);
  const rulesByColumn = useGameStore(({ rules }) => rules.columns);
  const numberOfColumns = useGameStore(({ numberOfColumns }) => numberOfColumns);

  return (
    <div className={styles.wrap}>
      {Array.from({ length: numberOfColumns }).map((_, column) => {
        const rules = rulesByColumn[column];
        return (
          <div className={styles.column} key={column} style={{ width: itemSize }}>
            {rules?.map((rule, index) => (
              <div key={index} className={styles.item}>
                {rule}
              </div>
            ))}
            <div className={classNames(styles.item, styles.options)}>
              {getPositionsForRules({ rules: rules ?? [], length: numberOfColumns }).length}
            </div>
          </div>
        );
      })}
    </div>
  );
}
