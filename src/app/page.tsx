'use client';

import React from 'react';
import { gameDefinitions } from '@/data/gameDefinitions';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <ul>
        {gameDefinitions.map(({ id }) => (
          <li key={id}>
            <Link href={`/play/${id}`} style={{ color: 'white' }}>
              {id}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
