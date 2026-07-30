import { ExternalLink } from 'lucide-react';
import { AsteroidRiskBadge } from './AsteroidRiskBadge';
import { formatDayMonth, formatNumber } from '../../lib/format';
import type { NormalizedAsteroid } from '../../lib/asteroids/types';

export function AsteroidCard({ asteroid }: { asteroid: NormalizedAsteroid }) {
	return (
		<article className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4">
			<div className="flex items-start justify-between gap-3">
				<div>
					<h3 className="font-semibold text-text">{asteroid.name}</h3>
					<p className="text-xs text-text-muted">
						Approche le {formatDayMonth(new Date(asteroid.closeApproachDate))}
					</p>
				</div>
				<AsteroidRiskBadge level={asteroid.riskLevel} />
			</div>
			<dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
				<div>
					<dt className="text-text-muted">Diamètre estimé</dt>
					<dd className="font-medium text-text">
						{formatNumber(asteroid.diameterMinKm * 1000)}–{formatNumber(asteroid.diameterMaxKm * 1000)}{' '}
						m
					</dd>
				</div>
				<div>
					<dt className="text-text-muted">Distance de survol</dt>
					<dd className="font-medium text-text">
						{formatNumber(asteroid.missDistanceLunar, 1)} distances lunaires
					</dd>
				</div>
				<div>
					<dt className="text-text-muted">Distance (km)</dt>
					<dd className="font-medium text-text">{formatNumber(asteroid.missDistanceKm)} km</dd>
				</div>
				<div>
					<dt className="text-text-muted">Vitesse</dt>
					<dd className="font-medium text-text">{formatNumber(asteroid.velocityKmS, 1)} km/s</dd>
				</div>
			</dl>
			<a
				href={asteroid.jplUrl}
				target="_blank"
				rel="noreferrer"
				className="flex w-fit items-center gap-1 text-xs text-accent hover:underline"
			>
				Fiche JPL <ExternalLink size={12} />
			</a>
		</article>
	);
}
