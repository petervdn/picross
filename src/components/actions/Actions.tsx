import React from 'react';
import { RowOrColumn } from '@/types/misc.types';
import {
  applyGuaranteedStates,
  findGuaranteedBoardItemStatesForRowsOrColumns,
} from '@/utils/solve.utils';
import { useGameStore } from '@/store/game.store';

export function Actions() {
  const { boardState, setBoardState, gameDefinition } = useGameStore(
    ({ gameDefinition, boardState, setBoardState }) => ({
      gameDefinition,
      boardState,
      setBoardState,
    }),
  );
  const onTestClick = (type: RowOrColumn) => {
    if (gameDefinition) {
      const guaranteedStates = findGuaranteedBoardItemStatesForRowsOrColumns({
        type,
        boardState,
        gameDefinition,
      });

      setBoardState(applyGuaranteedStates({ guaranteedStates, boardState, type }));
    }
  };

  const onClearBoardClick = () => {
    setBoardState({});
  };

  return (
    <>
      <h2>Actions</h2>
      <button type="button" onClick={onClearBoardClick}>
        Clear
      </button>
      <button type="button" onClick={onClearBoardClick}>
        Permutations
      </button>
      <button type="button" onClick={() => onTestClick('row')}>
        Find overlaps for rows
      </button>
      <button type="button" onClick={() => onTestClick('column')}>
        Find overlaps for columns
      </button>
    </>
  );
}
