'use client';

import styles from './GameBoard.module.css';
import { GameBoardItem } from '@/components/game-board-item/GameBoardItem';
import { RowRules } from '@/components/row-rules/RowRules';
import { ColumnRules } from '@/components/colum-rules/ColumnRules';
import { useGameStore } from '@/store/game.store';

export function GameBoard() {
  const { gameDefinition } = useGameStore(({ gameDefinition }) => ({
    gameDefinition,
  }));

  if (!gameDefinition) {
    return null;
  }

  return (
    <>
      <ColumnRules />
      {Array.from({ length: gameDefinition.numberOfRows }).map((_, row) => (
        <div key={row} className={styles.row}>
          <RowRules rowIndex={row} />
          {Array.from({ length: gameDefinition.numberOfColumns }).map((_, column) => (
            <GameBoardItem key={column} row={row} column={column} />
          ))}
        </div>
      ))}
    </>
  );
}
