'use client';

import styles from './GameBoard.module.css';
import { GameBoardItem } from '@/components/game-board-item/GameBoardItem';
import { RowRules } from '@/components/row-rules/RowRules';
import { ColumnRules } from '@/components/colum-rules/ColumnRules';
import { useGameStore } from '@/store/gameStore';

export function GameBoard() {
  const { numberOfColumns, numberOfRows } = useGameStore();

  return (
    <div className={styles.wrap}>
      <ColumnRules />
      {Array.from({ length: numberOfRows }).map((_, row) => (
        <div key={row} className={styles.row}>
          <RowRules row={row} />
          {Array.from({ length: numberOfColumns }).map((_, column) => (
            <GameBoardItem key={column} row={row} column={column} />
          ))}
        </div>
      ))}
    </div>
  );
}
