'use client';

import { GameBoard } from '@/components/game-board/GameBoard';
import styles from '@/app/page.module.css';
import { InteractionModeSelect } from '@/components/interaction-mode-select/InteractionModeSelect';
import React, { useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { NextPageParams } from '@/types/page';
import { gameDefinitions } from '@/data/gameDefinitions';
import { GameComponent } from '@/components/GameComponent';
import { useGameStore } from '@/store/game.store';

export default function Page({ params }: { params: { gameId: string } }) {
  // const router = useRouter();
  console.log('on server', params);
  const game = gameDefinitions.find(({ id }) => id === params.gameId);

  const { setGameDefinition, gameDefinition } = useGameStore(
    ({ setGameDefinition, gameDefinition }) => ({
      setGameDefinition,
      gameDefinition,
    }),
  );

  useEffect(() => {
    setGameDefinition(game);
  }, [game, setGameDefinition]);

  if (!game) {
    notFound();
  }

  return (
    <>
      <h1>Play {game.id}</h1>
      <GameBoard />
      <div className={styles.container}>
        <InteractionModeSelect />
        <h2>Actions</h2>
      </div>
    </>
  );
}
