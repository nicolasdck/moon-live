import { Ruler } from 'lucide-react';
import { DashboardCard } from './DashboardCard';
import { AVERAGE_EARTH_MOON_DISTANCE_KM } from '../../lib/astro/constants';
import { formatDayMonth, formatNumber } from '../../lib/format';
import type { MoonSnapshot } from '../../types/moon';

export function MoonDistanceCard({ snapshot }: { snapshot: MoonSnapshot }) {
	const relativeToAverage =
		((snapshot.distanceKm - AVERAGE_EARTH_MOON_DISTANCE_KM) / AVERAGE_EARTH_MOON_DISTANCE_KM) *
		100;

	return (
		<DashboardCard title="Distance Terre-Lune" icon={Ruler}>
			<p className="text-3xl font-bold text-accent-strong">
				{formatNumber(snapshot.distanceKm)} km
			</p>
			<p className="mb-4 text-sm text-text-muted">
				{relativeToAverage >= 0 ? '+' : ''}
				{formatNumber(relativeToAverage, 1)}% par rapport à la distance moyenne
			</p>
			<dl className="grid grid-cols-2 gap-3 text-sm">
				<div>
					<dt className="text-text-muted">Prochain périgée</dt>
					<dd className="font-medium text-text">
						{formatDayMonth(snapshot.nextPerigee.time)} ·{' '}
						{formatNumber(snapshot.nextPerigee.distanceKm)} km
					</dd>
				</div>
				<div>
					<dt className="text-text-muted">Prochaine apogée</dt>
					<dd className="font-medium text-text">
						{formatDayMonth(snapshot.nextApogee.time)} ·{' '}
						{formatNumber(snapshot.nextApogee.distanceKm)} km
					</dd>
				</div>
			</dl>
		</DashboardCard>
	);
}
