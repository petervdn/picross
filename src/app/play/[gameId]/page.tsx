'use client';

import { GameBoard } from '@/components/game-board/GameBoard';
import styles from './page.module.css';
import { InteractionModeSelect } from '@/components/interaction-mode-select/InteractionModeSelect';
import React, { useEffect } from 'react';
import { notFound } from 'next/navigation';
import { gameDefinitions } from '@/data/gameDefinitions';
import { useGameStore } from '@/store/game.store';
import {
  applyGuaranteedStates,
  findGuaranteedBoardItemStatesForRowsOrColumns,
} from '@/utils/solve.utils';
import { RowOrColumn } from '@/types/misc.types';

export default function Page({ params }: { params: { gameId: string } }) {
  const game = gameDefinitions.find(({ id }) => id === params.gameId);

  const { setGameDefinition, boardState, setBoardState } = useGameStore(
    ({ setGameDefinition, gameDefinition, boardState, setBoardState }) => ({
      setGameDefinition,
      gameDefinition,
      boardState,
      setBoardState,
    }),
  );

  useEffect(() => {
    setGameDefinition(game);
  }, [game, setGameDefinition]);

  if (!game) {
    notFound();
  }

  const onTestClick = (type: RowOrColumn) => {
    if (game) {
      const guaranteedStates = findGuaranteedBoardItemStatesForRowsOrColumns({
        type,
        boardState,
        gameDefinition: game,
      });

      setBoardState(applyGuaranteedStates({ guaranteedStates, boardState, type }));
    }
  };

  return (
    <>
      <div className={styles.container}></div>
      <GameBoard />
      <div className={styles.container}>
        <InteractionModeSelect />
        <h2>Actions</h2>
        <button type={'button'} onClick={() => onTestClick('row')}>
          Find overlaps for rows
        </button>
        <button type={'button'} onClick={() => onTestClick('column')}>
          Find overlaps for columns
        </button>
      </div>
    </>
  );
}
