import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Visual Site Builder',
  description: 'Block-based visual site builder',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning className={inter.variable}>
      <body className={`antialiased bg-slate-900 text-slate-100 min-h-screen ${inter.className}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
