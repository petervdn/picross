import styles from '@/components/game-board/GameBoard.module.css';

type Props = {
  row: number;
  column: number;
};

export function GameBoardItem({ row, column }: Props) {
  return (
    <div className={styles.boardItem}>
      {row},{column}
    </div>
  );
}
