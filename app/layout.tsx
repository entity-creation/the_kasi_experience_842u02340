import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Kasi Experience',
  description: 'A cinematic, emotional digital gift experience',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
