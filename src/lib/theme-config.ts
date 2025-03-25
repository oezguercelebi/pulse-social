import { ThemeOptions } from '@radix-ui/themes';

// This file centralizes theme configuration for consistency

export const themeOptions: ThemeOptions = {
  // Light mode by default, can be toggled
  appearance: 'light',
  // The primary color of the UI
  accentColor: 'blue',
  // Moderate border rounding
  radius: 'medium',
  // Default scaling
  scaling: '100%',
  // Potential for dark/light mode switching
  hasBackground: true,
  // Can be used for high contrast mode
  highContrast: false,
};

// Theme colors available in Radix Themes
export const themeColors = [
  'tomato',
  'red',
  'ruby',
  'crimson',
  'pink',
  'plum',
  'purple',
  'violet',
  'iris',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'jade',
  'green',
  'grass',
  'brown',
  'orange',
  'amber',
  'yellow',
  'lime',
  'mint',
  'sky',
] as const;

// We can also provide preset theme combinations
export const themePresets = {
  default: {
    appearance: 'light',
    accentColor: 'blue',
    radius: 'medium',
  },
  modern: {
    appearance: 'light',
    accentColor: 'cyan',
    radius: 'full',
  },
  classic: {
    appearance: 'light',
    accentColor: 'indigo',
    radius: 'small',
  },
  dark: {
    appearance: 'dark',
    accentColor: 'violet',
    radius: 'medium',
  },
} as const; 