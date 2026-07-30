import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
	{ to: '/', label: 'Dashboard' },
	{ to: '/globe', label: 'Globe 3D' },
];

export function HeaderNav() {
	return (
		<nav className="flex items-center gap-2">
			{NAV_LINKS.map((link) => (
				<NavLink
					key={link.to}
					to={link.to}
					end={link.to === '/'}
					className={({ isActive }) =>
						`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
							isActive ? 'bg-surface text-accent-strong' : 'text-text-muted hover:text-text'
						}`
					}
				>
					{link.label}
				</NavLink>
			))}
		</nav>
	);
}
