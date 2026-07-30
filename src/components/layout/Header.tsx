import { NightModeToggle } from './NightModeToggle';
import { InstallPwaButton } from './InstallPwaButton';
import { HeaderNav } from './HeaderNav';

export function Header() {
	return (
		<header className="flex flex-wrap items-center justify-between gap-4 border-b border-border p-2">
			<div className="w-full px-3 flex flex-wrap justify-between items-center gap-6">
				<p className="text-xs tracking-[0.35em] text-text-muted uppercase">
					Moon Live
				</p>
				<NightModeToggle />
			</div>
			<HeaderNav />
			<div className="flex items-center gap-3">
				<InstallPwaButton />
			</div>
		</header>
	);
}
