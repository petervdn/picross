'use client';

import { GameDefinition } from '@/types/misc.types';
import { useEffect } from 'react';

export function GameComponent({ game }: { game: GameDefinition }) {
  useEffect(() => {}, []);
  return <h2>{game.id}</h2>;
}
