import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { getYearMoonStats } from '../lib/astro/annualMoonStats';
import { AnnualDistanceChart } from '../components/annualMoonStats/AnnualDistanceChart';
import { FullMoonStatsList } from '../components/annualMoonStats/FullMoonStatsList';
import { formatFullDate, formatNumber } from '../lib/format';

export default function AnnualMoonStatsPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentYear = new Date().getFullYear();
	const yearParam = Number.parseInt(searchParams.get('annee') ?? '', 10);
	const year = Number.isFinite(yearParam) && yearParam > 0 ? yearParam : currentYear;

	const stats = useMemo(() => getYearMoonStats(year), [year]);

	function goToYear(nextYear: number) {
		setSearchParams({ annee: String(nextYear) });
	}

	return (
		<div className="flex flex-col gap-5">
			<div>
				<h2 className="text-xl font-semibold text-text">Super lunes & micro lunes</h2>
				<p className="text-sm text-text-muted">
					Distance Terre-Lune de chaque pleine lune de l'année, calculée localement.
				</p>
			</div>

			<div className="flex items-center justify-between">
				<button
					type="button"
					onClick={() => goToYear(year - 1)}
					aria-label="Année précédente"
					className="rounded-full border border-border p-2 text-text-muted transition-colors hover:text-text"
				>
					<ChevronLeft size={16} />
				</button>
				<h3 className="text-lg font-semibold text-text">{year}</h3>
				<button
					type="button"
					onClick={() => goToYear(year + 1)}
					aria-label="Année suivante"
					className="rounded-full border border-border p-2 text-text-muted transition-colors hover:text-text"
				>
					<ChevronRight size={16} />
				</button>
			</div>

			<div className="rounded-2xl border border-border bg-surface p-5">
				<div className="mb-4 flex items-center gap-2 text-text-muted">
					<Sparkles size={16} />
					<h4 className="text-xs font-semibold tracking-[0.2em] uppercase">Résumé de l'année</h4>
				</div>
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
					<div>
						<p className="text-3xl font-bold text-accent-strong">{stats.supermoonCount}</p>
						<p className="text-sm text-text-muted">super lune(s)</p>
					</div>
					<div>
						<p className="text-3xl font-bold text-warn">{stats.micromoonCount}</p>
						<p className="text-sm text-text-muted">micro lune(s)</p>
					</div>
					<div>
						<p className="text-lg font-bold text-text">{formatNumber(stats.closest.distanceKm)} km</p>
						<p className="text-sm text-text-muted">
							pleine lune la plus proche ({formatFullDate(stats.closest.date)})
						</p>
					</div>
					<div>
						<p className="text-lg font-bold text-text">{formatNumber(stats.farthest.distanceKm)} km</p>
						<p className="text-sm text-text-muted">
							pleine lune la plus loin ({formatFullDate(stats.farthest.date)})
						</p>
					</div>
				</div>
				<p className="mt-4 text-xs text-text-muted">
					« Super lune » et « micro lune » ne correspondent à aucune définition astronomique
					officielle — ce sont des conventions courantes désignant les pleines lunes proches du
					périgée ou de l'apogée. Les seuils utilisés ici sont approximatifs.
				</p>
			</div>

			<div className="rounded-2xl border border-border bg-surface p-4">
				<AnnualDistanceChart fullMoons={stats.fullMoons} />
			</div>

			<FullMoonStatsList fullMoons={stats.fullMoons} />
		</div>
	);
}
