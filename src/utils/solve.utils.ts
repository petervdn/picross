import { useGameStore } from '@/store/game.store';

export function solve() {
  const { numberOfColumns, numberOfRows, getGroup } = useGameStore.getState();

  for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
    const column = getGroup('column', columnIndex);
    console.log(columnIndex, column);
  }
}

//function findCommonItemsInPermutations()
