import styles from '@/components/game-board/GameBoard.module.css';
import { useLayoutStore } from '@/store/layout.store';
import { useBoardItemState } from '@/utils/hooks/useBoardItemState';
import { useCallback, useMemo } from 'react';
import { useGameStore } from '@/store/game.store';
import { BoardItemState } from '@/types/misc.types';
import classNames from 'classnames';
import { useInteractionStore } from '@/store/interaction.store';

type Props = {
  row: number;
  column: number;
};

export function GameBoardItem({ row, column }: Props) {
  const { boardItemSize, boardItemMargin } = useLayoutStore(
    ({ boardItemSize, boardItemMargin }) => ({
      boardItemSize,
      boardItemMargin,
    }),
  );
  const { interactionMode } = useInteractionStore(({ interactionMode }) => ({ interactionMode }));
  const setItemState = useGameStore((state) => state.setItemState);
  const itemState = useBoardItemState({ boardPosition: { column, row } });

  const onClick = useCallback(() => {
    setItemState({
      boardPosition: { row, column },
      itemState: itemState === undefined ? interactionMode : undefined,
    });
  }, [column, interactionMode, itemState, row, setItemState]);

  const className = useMemo(() => {
    if (itemState === 'crossed') {
      return 'disabled';
    }
    if (itemState === 'filled') {
      return 'enabled';
    }
    if (itemState === 'temporary') {
      return 'temporary';
    }
  }, [itemState]);

  return (
    <div
      className={classNames(styles.boardItem, className ? styles[className] : undefined)}
      style={{ width: boardItemSize, height: boardItemSize, margin: boardItemMargin }}
      onClick={onClick}
    ></div>
  );
}
