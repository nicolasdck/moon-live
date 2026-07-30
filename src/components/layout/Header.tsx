import { NightModeToggle } from './NightModeToggle';
import { InstallPwaButton } from './InstallPwaButton';
import { HeaderNav } from './HeaderNav';

export function Header() {
	return (
		<header className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-4">
			<div className="flex flex-wrap items-center gap-6">
				<p className="text-xs tracking-[0.35em] text-text-muted uppercase">Moon Live</p>
				<HeaderNav />
			</div>
			<div className="flex items-center gap-3">
				<InstallPwaButton />
				<NightModeToggle />
			</div>
		</header>
	);
}
