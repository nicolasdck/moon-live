import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
	title: string;
	icon: LucideIcon;
	children: ReactNode;
}

export function DashboardCard({ title, icon: Icon, children }: DashboardCardProps) {
	return (
		<section className="rounded-2xl border border-border bg-surface p-5">
			<div className="mb-4 flex items-center gap-2 text-text-muted">
				<Icon size={16} />
				<h2 className="text-xs font-semibold tracking-[0.2em] uppercase">{title}</h2>
			</div>
			{children}
		</section>
	);
}
