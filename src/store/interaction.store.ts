import { create } from 'zustand';
import { BoardItemState } from '@/types/misc.types';

export type InteractionMode = Exclude<BoardItemState, undefined>;

type InteractionStore = {
  interactionMode: InteractionMode;
  setInteractionMode: (mode: InteractionMode) => void;
};

export const useInteractionStore = create<InteractionStore>((set) => ({
  interactionMode: 'filled',
  setInteractionMode: (mode) => {
    set(() => ({
      interactionMode: mode,
    }));
  },
}));
