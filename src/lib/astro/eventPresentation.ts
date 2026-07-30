import { Moon, Sparkles, Sun, type LucideIcon } from 'lucide-react';
import { formatNumber } from '../format';
import type { CelestialEvent } from '../../types/events';

export const EVENT_ICON: Record<CelestialEvent['type'], LucideIcon> = {
	'lunar-eclipse': Moon,
	'solar-eclipse': Sun,
	supermoon: Sparkles,
};

export function getEventTitleAndDetail(event: CelestialEvent): { title: string; detail: string } {
	switch (event.type) {
		case 'lunar-eclipse':
			return {
				title: `Éclipse lunaire ${event.kind}`,
				detail:
					event.kind === 'total'
						? 'La Lune entière traverse l’ombre de la Terre.'
						: event.kind === 'partial'
							? `${formatNumber(event.obscuration * 100)}% du disque lunaire obscurci au pic.`
							: 'Assombrissement subtil, difficile à observer à l’œil nu.',
			};
		case 'solar-eclipse':
			return {
				title: `Éclipse solaire ${event.kind}`,
				detail:
					event.latitude !== undefined && event.longitude !== undefined
						? `Visible depuis certaines régions (centrée vers ${event.latitude.toFixed(1)}°, ${event.longitude.toFixed(1)}°).`
						: 'Visibilité partielle depuis certaines régions du globe.',
			};
		case 'supermoon':
			return {
				title: 'Super lune',
				detail: `Pleine lune à ${formatNumber(event.distanceKm)} km — proche du périgée.`,
			};
	}
}
