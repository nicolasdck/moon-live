import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
	{ to: '/', label: 'Dashboard' },
	{ to: '/globe', label: '3D Map' },
	{ to: '/asteroides', label: 'Asteroids' },
	{ to: '/equilibre', label: 'Balance' },
];

export function HeaderNav() {
	return (
		<nav className="w-full flex items-center justify-center gap-1">
			{NAV_LINKS.map((link) => (
				<NavLink
					key={link.to}
					to={link.to}
					end={link.to === '/'}
					className={({ isActive }) =>
						`rounded-full text-center px-3 py-2 text-sm font-medium transition-colors ${
							isActive
								? 'bg-surface text-accent-strong'
								: 'text-text-muted hover:text-text'
						}`
					}
				>
					{link.label}
				</NavLink>
			))}
		</nav>
	);
}
