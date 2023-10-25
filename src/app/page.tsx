'use client';

import { GameBoard } from '@/components/game-board/GameBoard';
import { InteractionModeSelect } from '@/components/interaction-mode-select/InteractionModeSelect';
import styles from './page.module.css';
import React from 'react';
import { solve } from '@/utils/solve.utils';

export default function Home() {
  const onSolveClick = () => {
    solve();
  };
  return (
    <div className={styles.wrap}>
      <h1 style={{ marginLeft: 200 }}>Picross</h1>
      <GameBoard />
      <div className={styles.container}>
        <InteractionModeSelect />
        <h2>Actions</h2>

        <button type="button" onClick={onSolveClick}>
          Solve
        </button>
      </div>
    </div>
  );
}
