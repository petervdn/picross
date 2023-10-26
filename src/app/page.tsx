'use client';

import React from 'react';
import { gameDefinitions } from '@/data/gameDefinitions';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1 style={{ marginLeft: 200 }}>Picross</h1>
      {gameDefinitions.map(({ id }) => (
        <Link key={id} href={`/play/${id}`} style={{ color: 'white' }}>
          {id}
        </Link>
      ))}
    </>
  );
}
