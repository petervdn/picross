'use client';

import { GameBoard } from '@/components/game-board/GameBoard';
import styles from './page.module.css';
import { InteractionModeSelect } from '@/components/interaction-mode-select/InteractionModeSelect';
import React, { useEffect } from 'react';
import { notFound } from 'next/navigation';
import { gameDefinitions } from '@/data/gameDefinitions';
import { useGameStore } from '@/store/game.store';

export default function Page({ params }: { params: { gameId: string } }) {
  console.log('on server', params);
  const game = gameDefinitions.find(({ id }) => id === params.gameId);

  const { setGameDefinition } = useGameStore(({ setGameDefinition, gameDefinition }) => ({
    setGameDefinition,
    gameDefinition,
  }));

  useEffect(() => {
    setGameDefinition(game);
  }, [game, setGameDefinition]);

  if (!game) {
    notFound();
  }

  return (
    <>
      <div className={styles.container}>
        <h2>{game.id}</h2>
      </div>
      <GameBoard />
      <div className={styles.container}>
        <InteractionModeSelect />
        <h2>Actions</h2>
      </div>
    </>
  );
}
