import { Sparkles } from 'lucide-react';
import { DashboardCard } from './DashboardCard';
import { getFullMoonName } from '../../lib/astro/fullMoonNames';
import { FULL_MOON_DISPLAY_WINDOW_DAYS } from '../../lib/astro/constants';
import type { MoonSnapshot } from '../../types/moon';

const DAY_MS = 86_400_000;

export function FullMoonNameCard({ snapshot }: { snapshot: MoonSnapshot }) {
	const { nearestFullMoon } = snapshot;
	const daysAway = Math.abs(nearestFullMoon.date.getTime() - snapshot.computedAt.getTime()) / DAY_MS;
	if (daysAway > FULL_MOON_DISPLAY_WINDOW_DAYS) return null;

	const info = getFullMoonName(nearestFullMoon.date);
	const dateLabel = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long' }).format(
		nearestFullMoon.date,
	);

	return (
		<DashboardCard title="Nom traditionnel de la pleine lune" icon={Sparkles}>
			<div className="flex items-center gap-4">
				<span className="text-4xl" aria-hidden>
					{info.emoji}
				</span>
				<div>
					<p className="text-lg font-semibold text-text">
						{info.nameFr} <span className="text-text-muted">({info.name})</span>
					</p>
					<p className="text-sm text-text-muted">
						{nearestFullMoon.isPast ? 'Pleine lune du' : 'Pleine lune à venir le'} {dateLabel}
					</p>
				</div>
			</div>
			<p className="mt-3 text-sm text-text-muted">{info.description}</p>
			<p className="mt-2 text-xs text-text-muted italic">
				Selon les traditions populaires et amérindiennes (variantes régionales possibles).
			</p>
		</DashboardCard>
	);
}
