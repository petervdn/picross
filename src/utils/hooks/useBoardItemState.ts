import { getItemKey, useGameStore } from '@/store/game.store';
import { useMemo } from 'react';
import { BoardPosition } from '@/types/misc.types';

type Props = {
  boardPosition: BoardPosition;
};

export function useBoardItemState({ boardPosition }: Props) {
  const itemStates = useGameStore((state) => state.itemStates);
  const itemKey = useMemo(() => getItemKey(boardPosition), [boardPosition]);

  return useMemo(() => itemStates[itemKey], [itemKey, itemStates]);
}
