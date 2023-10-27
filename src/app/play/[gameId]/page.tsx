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
import { Actions } from '@/components/actions/Actions';

export default function Page({ params }: { params: { gameId: string } }) {
  const game = gameDefinitions.find(({ id }) => id === params.gameId);

  const { setGameDefinition } = useGameStore(({ setGameDefinition }) => ({
    setGameDefinition,
  }));

  useEffect(() => {
    setGameDefinition(game);
  }, [game, setGameDefinition]);

  if (!game) {
    notFound();
  }

  return (
    <>
      <div className={styles.container}></div>
      <GameBoard />
      <div className={styles.container}>
        <InteractionModeSelect />
        <Actions />
      </div>
    </>
  );
}
