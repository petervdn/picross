import { getItemKey, useGameStore } from '@/store/game.store';
import { BoardPosition } from '@/types/misc.types';
import { useMemo } from 'react';

type Props = {
  boardPosition: BoardPosition;
};

export function useBoardItemState({ boardPosition }: Props) {
  const itemStates = useGameStore((state) => state.itemStates);
  const itemKey = useMemo(() => getItemKey(boardPosition), [boardPosition]);

  return useMemo(() => itemStates[itemKey], [itemKey, itemStates]);
}
