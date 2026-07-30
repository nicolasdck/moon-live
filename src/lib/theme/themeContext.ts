import { createContext } from 'react';

export type AppTheme = 'space' | 'night';

export interface ThemeContextValue {
	theme: AppTheme;
	toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export const THEME_STORAGE_KEY = 'moon-live:theme';
