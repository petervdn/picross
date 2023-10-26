import { getItemKey, useGameStore } from '@/store/game.store';
import { useMemo } from 'react';
import { BoardPosition } from '@/types/misc.types';

type Props = {
  boardPosition: BoardPosition;
};

export function useBoardItemState({ boardPosition }: Props) {
  const boardState = useGameStore(({ boardState }) => boardState);
  const itemKey = useMemo(() => getItemKey(boardPosition), [boardPosition]);

  return useMemo(() => boardState[itemKey], [itemKey, boardState]);
}
