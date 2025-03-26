import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Import Radix Themes
import '@radix-ui/themes/styles.css';
import { Theme, Flex } from '@radix-ui/themes';

// Import Sidebar
import { Sidebar } from '@/components/ui/sidebar';

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
    <html lang="en" className="overflow-hidden">
      <body className={`${inter.className} overflow-hidden`}>
        <Theme {...themeOptions}>
          <Flex className="h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-hidden">{children}</main>
          </Flex>
        </Theme>
      </body>
    </html>
  );
} 