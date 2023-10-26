import { GameBoard } from '@/components/game-board/GameBoard';
import styles from '@/app/page.module.css';
import { InteractionModeSelect } from '@/components/interaction-mode-select/InteractionModeSelect';
import React from 'react';
import { notFound, useRouter } from 'next/navigation';

export default function Page() {
  notFound();
  // const router = useRouter();
  // console.log({ router });
  // return <h1>Play</h1>;
  // <GameBoard />
  // <div className={styles.container}>
  //     <InteractionModeSelect />
  //     <h2>Actions</h2>
  //
  //     <button type="button" onClick={onSolveClick}>
  //         Solve
  //     </button>
  // </div>
}
