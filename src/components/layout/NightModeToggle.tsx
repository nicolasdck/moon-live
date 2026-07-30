import { Flashlight, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export function NightModeToggle() {
	const { theme, toggleTheme } = useTheme();
	const isNight = theme === 'night';

	return (
		<button
			type="button"
			onClick={toggleTheme}
			aria-pressed={isNight}
			title={isNight ? 'Désactiver le mode vision nocturne' : 'Activer le mode vision nocturne'}
			className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-sm text-text transition-colors hover:border-accent"
		>
			{isNight ? <Flashlight size={16} /> : <Moon size={16} />}
			<span className="hidden sm:inline">{isNight ? 'Vision nocturne' : 'Mode espace'}</span>
		</button>
	);
}
