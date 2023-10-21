import styles from '@/components/game-board/GameBoard.module.css';
import { useLayoutStore } from '@/store/layout.store';

type Props = {
  row: number;
  column: number;
};

export function GameBoardItem({ row, column }: Props) {
  const itemSize = useLayoutStore(({ boardItemSize }) => boardItemSize);

  return <div className={styles.boardItem} style={{ width: itemSize, height: itemSize }}></div>;
}
