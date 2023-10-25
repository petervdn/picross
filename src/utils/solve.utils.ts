import { useGameStore } from '@/store/game.store';
import { getRowOrColumn } from '@/utils/game.utils';

export function solve() {
  const gameState = useGameStore.getState();

  for (let index = 0; index < gameState.numberOfColumns; index++) {
    const column = getRowOrColumn({ gameState, type: 'column', index });
    console.log(index, column);
  }
}
