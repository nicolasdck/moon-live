import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { THEME_STORAGE_KEY, ThemeContext, type AppTheme } from './themeContext';

function readStoredTheme(): AppTheme {
	if (typeof window === 'undefined') return 'space';
	const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
	return stored === 'night' ? 'night' : 'space';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<AppTheme>(readStoredTheme);

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		window.localStorage.setItem(THEME_STORAGE_KEY, theme);
	}, [theme]);

	const toggleTheme = useCallback(() => {
		setTheme((current) => (current === 'space' ? 'night' : 'space'));
	}, []);

	const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
