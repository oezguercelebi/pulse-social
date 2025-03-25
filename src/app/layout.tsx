import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Import Radix Themes
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

// Import Navigation
import { Navigation } from '@/components/ui/navigation';

// Import theme configuration
import { themeOptions } from '@/lib/theme-config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pulse - A Minimalist Social Platform',
  description: 'Share short-form thoughts and updates with your followers in real-time',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme {...themeOptions}>
          <Navigation />
          {children}
        </Theme>
      </body>
    </html>
  );
} 