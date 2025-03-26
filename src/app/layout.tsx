import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Import Radix Themes styles
import '@radix-ui/themes/styles.css';

// Import components
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Sidebar } from '@/components/ui/sidebar';

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
        <ThemeProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-hidden">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
} 