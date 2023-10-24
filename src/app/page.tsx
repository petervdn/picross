'use client';

import { GameBoard } from '@/components/game-board/GameBoard';
import { InteractionModeSelect } from '@/components/interaction-mode-select/InteractionModeSelect';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.wrap}>
      <h1>Picross</h1>
      <GameBoard />
      <InteractionModeSelect />
    </div>
  );
}
