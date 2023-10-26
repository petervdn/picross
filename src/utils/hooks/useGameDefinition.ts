import { useGameStore } from '@/store/game.store';
import { GameDefinition } from '@/types/misc.types';
import { useMemo } from 'react';

export function useGameDefinition(): GameDefinition {
  const { gameDefinition } = useGameStore(({ gameDefinition }) => ({ gameDefinition }));

  return useMemo(
    () =>
      gameDefinition ?? {
        id: '',
        numberOfColumns: 0,
        numberOfRows: 0,
        rules: { rows: [], columns: [] },
      },
    [gameDefinition],
  );
}
