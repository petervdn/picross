import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import styles from './layout.module.css';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Picross',
  description: 'Play, solve and generate picross puzzles',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles.wrap}>{children}</div>
      </body>
    </html>
  );
}
