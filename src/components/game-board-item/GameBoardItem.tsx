import styles from '@/components/game-board/GameBoard.module.css';
import { useLayoutStore } from '@/store/layout.store';
import { BoardPosition } from '@/types/misc.types';
import { useBoardItemState } from '@/utils/hooks/useBoardItemState';
import { useCallback } from 'react';
import { useGameStore } from '@/store/game.store';

type Props = {
  row: number;
  column: number;
};

export function GameBoardItem({ row, column }: Props) {
  const itemSize = useLayoutStore(({ boardItemSize }) => boardItemSize);
  const setItemState = useGameStore((state) => state.setItemState);
  const itemState = useBoardItemState({ boardPosition: { column, row } });

  const onClick = useCallback(() => {
    setItemState({ boardPosition: { row, column }, itemState: 'filled' });
  }, [column, row, setItemState]);

  return (
    <div
      className={styles.boardItem}
      style={{ width: itemSize, height: itemSize }}
      onClick={onClick}
    >
      {itemState}
    </div>
  );
}
