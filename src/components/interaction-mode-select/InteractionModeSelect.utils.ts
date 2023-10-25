import { BoardItemState } from '@/types/misc.types';

export function getLabelForBoardItemState(mode: BoardItemState) {
  switch (mode) {
    case 'filled': {
      return 'fill';
    }
    case 'crossed': {
      return 'exclude';
    }
    case 'temporary': {
      return 'try';
    }
  }
}
