import { Orbit, RefreshCw } from 'lucide-react';
import { formatNumber } from '../../lib/format';
import type { NormalizedAsteroid } from '../../lib/asteroids/types';

export function AsteroidsSummary({
	asteroids,
	lastFetchedAt,
	isRefreshing,
	onRefresh,
}: {
	asteroids: NormalizedAsteroid[];
	lastFetchedAt: Date | null;
	isRefreshing: boolean;
	onRefresh: () => void;
}) {
	const hazardousCount = asteroids.filter((a) => a.isPotentiallyHazardous).length;
	const closest = asteroids.reduce<NormalizedAsteroid | null>(
		(nearest, current) =>
			!nearest || current.missDistanceLunar < nearest.missDistanceLunar ? current : nearest,
		null,
	);

	return (
		<div className="rounded-2xl border border-border bg-surface p-5">
			<div className="mb-4 flex items-center justify-between gap-3">
				<div className="flex items-center gap-2 text-text-muted">
					<Orbit size={16} />
					<h2 className="text-xs font-semibold tracking-[0.2em] uppercase">
						Astéroïdes proches — 7 prochains jours
					</h2>
				</div>
				<button
					type="button"
					onClick={onRefresh}
					disabled={isRefreshing}
					className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-text-muted transition-colors hover:text-text disabled:opacity-50"
				>
					<RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
					Rafraîchir
				</button>
			</div>
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
				<div>
					<p className="text-3xl font-bold text-accent-strong">{asteroids.length}</p>
					<p className="text-sm text-text-muted">objets recensés</p>
				</div>
				<div>
					<p className="text-3xl font-bold text-warn">{hazardousCount}</p>
					<p className="text-sm text-text-muted">potentiellement dangereux</p>
				</div>
				{closest && (
					<div>
						<p className="text-3xl font-bold text-text">
							{formatNumber(closest.missDistanceLunar, 1)}
						</p>
						<p className="text-sm text-text-muted">DL — approche la plus proche ({closest.name})</p>
					</div>
				)}
			</div>
			{lastFetchedAt && (
				<p className="mt-4 text-xs text-text-muted">
					Dernière mise à jour :{' '}
					{new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(
						lastFetchedAt,
					)}{' '}
					· Données : NASA NeoWs (api.nasa.gov)
				</p>
			)}
		</div>
	);
}
