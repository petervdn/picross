import styles from '@/components/game-board/GameBoard.module.css';
import { useLayoutStore } from '@/store/layout.store';
import { useBoardItemState } from '@/utils/hooks/useBoardItemState';
import { useCallback, useMemo } from 'react';
import { useGameStore } from '@/store/game.store';
import { BoardItemState } from '@/types/misc.types';

type Props = {
  row: number;
  column: number;
};

export function GameBoardItem({ row, column }: Props) {
  const itemSize = useLayoutStore(({ boardItemSize }) => boardItemSize);
  const setItemState = useGameStore((state) => state.setItemState);
  const itemState = useBoardItemState({ boardPosition: { column, row } });

  const onClick = useCallback(() => {
    let newState: BoardItemState | undefined;
    if (itemState === undefined) {
      newState = 'filled';
    } else if (itemState === 'filled') {
      newState = 'crossed';
    }

    setItemState({ boardPosition: { row, column }, itemState: newState });
  }, [column, itemState, row, setItemState]);

  const content = useMemo(
    () => (itemState === 'crossed' ? 'X' : itemState === 'filled' ? '■' : ''),
    [itemState],
  );

  return (
    <div
      className={styles.boardItem}
      style={{ width: itemSize, height: itemSize }}
      onClick={onClick}
    >
      {content}
    </div>
  );
}
