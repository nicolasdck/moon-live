import {
	AVERAGE_EARTH_MOON_DISTANCE_KM,
	MICROMOON_MIN_DISTANCE_KM,
	SUPERMOON_MAX_DISTANCE_KM,
} from '../../lib/astro/constants';
import type { FullMoonOfYear } from '../../lib/astro/annualMoonStats';

const WIDTH = 340;
const HEIGHT = 220;
const TOP_MARGIN = 16;
const BOTTOM_MARGIN = 28;
const SIDE_MARGIN = 40;

const MONTH_FORMATTER = new Intl.DateTimeFormat('fr-FR', { month: 'short' });

const KIND_COLOR: Record<FullMoonOfYear['kind'], string> = {
	supermoon: 'var(--color-accent-strong)',
	micromoon: 'var(--color-warn)',
	standard: 'var(--color-text-muted)',
};

const REFERENCE_LINES = [
	{ distanceKm: AVERAGE_EARTH_MOON_DISTANCE_KM, label: 'Distance moyenne' },
	{ distanceKm: SUPERMOON_MAX_DISTANCE_KM, label: 'Seuil super lune' },
	{ distanceKm: MICROMOON_MIN_DISTANCE_KM, label: 'Seuil micro lune' },
];

export function AnnualDistanceChart({ fullMoons }: { fullMoons: FullMoonOfYear[] }) {
	if (fullMoons.length === 0) return null;

	const values = [
		...fullMoons.map((moon) => moon.distanceKm),
		...REFERENCE_LINES.map((line) => line.distanceKm),
	];
	const padding = (Math.max(...values) - Math.min(...values)) * 0.15;
	const yMin = Math.min(...values) - padding;
	const yMax = Math.max(...values) + padding;
	const yRange = yMax - yMin;

	const plotWidth = WIDTH - SIDE_MARGIN * 2;
	const plotHeight = HEIGHT - TOP_MARGIN - BOTTOM_MARGIN;

	const xScale = (index: number) =>
		SIDE_MARGIN + (index / (fullMoons.length - 1)) * plotWidth;
	const yScale = (distanceKm: number) =>
		TOP_MARGIN + ((yMax - distanceKm) / yRange) * plotHeight;

	const points = fullMoons.map((moon, index) => ({
		...moon,
		x: xScale(index),
		y: yScale(moon.distanceKm),
	}));
	const pathD = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');

	return (
		<svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="presentation">
			{REFERENCE_LINES.map((line) => (
				<g key={line.label}>
					<line
						x1={SIDE_MARGIN}
						y1={yScale(line.distanceKm)}
						x2={WIDTH - SIDE_MARGIN}
						y2={yScale(line.distanceKm)}
						stroke="var(--color-border)"
						strokeWidth={1}
						strokeDasharray="3 3"
					/>
					<text
						x={0}
						y={yScale(line.distanceKm) - 3}
						className="fill-text-muted text-[8px]"
					>
						{line.label}
					</text>
				</g>
			))}
			<path d={pathD} fill="none" stroke="var(--color-border)" strokeWidth={1.5} />
			{points.map((point) => (
				<circle key={point.date.toISOString()} cx={point.x} cy={point.y} r={4} fill={KIND_COLOR[point.kind]} />
			))}
			{points.map((point) => (
				<text
					key={`label-${point.date.toISOString()}`}
					x={point.x}
					y={HEIGHT - BOTTOM_MARGIN + 14}
					textAnchor="middle"
					className="fill-text-muted text-[8px] capitalize"
				>
					{MONTH_FORMATTER.format(point.date)}
				</text>
			))}
		</svg>
	);
}
