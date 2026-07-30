import { CalendarDays } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { InstallPwaButton } from './InstallPwaButton';
import { HeaderNav } from './HeaderNav';

export function Header() {
	return (
		<header className="flex flex-wrap items-center justify-between gap-4 border-b border-border p-2">
			<div className="flex w-full flex-wrap items-center justify-between gap-6 px-3">
				<Link
					to="/"
					className="text-xs tracking-[0.35em] text-text-muted uppercase transition-colors hover:text-text"
				>
					Moon Live
				</Link>
				<NavLink
					to="/calendrier"
					aria-label="Calendrier"
					title="Calendrier"
					className={({ isActive }) =>
						`flex items-center justify-center rounded-full border border-border p-2.5 transition-colors ${
							isActive ? 'bg-surface text-accent-strong' : 'text-text-muted hover:text-text'
						}`
					}
				>
					<CalendarDays size={16} />
				</NavLink>
			</div>
			<HeaderNav />
			<div className="flex items-center gap-3">
				<InstallPwaButton />
			</div>
		</header>
	);
}
