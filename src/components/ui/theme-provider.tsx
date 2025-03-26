'use client';

import { Theme } from '@radix-ui/themes';
import { ReactNode } from 'react';
import { themeOptions } from '@/lib/theme-config';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <Theme {...themeOptions}>{children}</Theme>;
} 