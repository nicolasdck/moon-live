import { formatFullDate, formatNumber } from '../../lib/format';
import type { FullMoonOfYear } from '../../lib/astro/annualMoonStats';

const KIND_LABEL: Record<FullMoonOfYear['kind'], string | null> = {
	supermoon: 'Super lune',
	micromoon: 'Micro lune',
	standard: null,
};

const KIND_BADGE_CLASS: Record<FullMoonOfYear['kind'], string> = {
	supermoon: 'border-accent-strong text-accent-strong',
	micromoon: 'border-warn text-warn',
	standard: '',
};

export function FullMoonStatsList({ fullMoons }: { fullMoons: FullMoonOfYear[] }) {
	return (
		<div className="flex flex-col gap-2">
			{fullMoons.map((moon) => {
				const badgeLabel = KIND_LABEL[moon.kind];
				return (
					<div
						key={moon.date.toISOString()}
						className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface p-3 text-sm"
					>
						<div>
							<p className="font-medium capitalize text-text">{formatFullDate(moon.date)}</p>
							<p className="text-xs text-text-muted">{formatNumber(moon.distanceKm)} km</p>
						</div>
						{badgeLabel && (
							<span
								className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${KIND_BADGE_CLASS[moon.kind]}`}
							>
								{badgeLabel}
							</span>
						)}
					</div>
				);
			})}
		</div>
	);
}
