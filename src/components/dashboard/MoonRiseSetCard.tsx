import { Sunrise, Sunset } from 'lucide-react';
import { DashboardCard } from './DashboardCard';
import { formatTime } from '../../lib/format';
import type { GeolocationState } from '../../hooks/useGeolocation';
import type { RiseSetTimes } from '../../types/moon';

export function MoonRiseSetCard({
	riseSet,
	geolocation,
}: {
	riseSet: RiseSetTimes;
	geolocation: GeolocationState;
}) {
	return (
		<DashboardCard title="Lever & coucher de la Lune" icon={Sunrise}>
			<div className="grid grid-cols-2 gap-4">
				<div className="flex items-center gap-2">
					<Sunrise size={20} className="text-accent" />
					<div>
						<p className="text-xs text-text-muted">Lever</p>
						<p className="text-xl font-semibold text-text">{formatTime(riseSet.rise)}</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Sunset size={20} className="text-accent" />
					<div>
						<p className="text-xs text-text-muted">Coucher</p>
						<p className="text-xl font-semibold text-text">{formatTime(riseSet.set)}</p>
					</div>
				</div>
			</div>
			<p className="mt-4 text-xs text-text-muted">
				{geolocation.isFallback
					? 'Position par défaut (Paris) — activez la géolocalisation pour votre position exacte.'
					: 'Basé sur votre position actuelle.'}
			</p>
		</DashboardCard>
	);
}
