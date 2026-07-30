import { formatTime } from '../../lib/format';
import type { EclipseLocalPhase } from '../../lib/astro/eclipseLocalCircumstances';

const WIDTH = 320;
const HEIGHT = 200;
const TOP_MARGIN = 24;
const BOTTOM_MARGIN = 24;
const SIDE_MARGIN = 30;

export function EclipseSkyPathChart({ phases }: { phases: EclipseLocalPhase[] }) {
	if (phases.length === 0) return null;

	const altitudes = phases.map((phase) => phase.altitudeDeg);
	const azimuths = phases.map((phase) => phase.azimuthDeg);
	const minAz = Math.min(...azimuths);
	const maxAz = Math.max(...azimuths);
	const azRange = Math.max(maxAz - minAz, 10);

	// Padding scales with the actual altitude range instead of a fixed floor,
	// so the chart frames tightly around the real data whether it's high in
	// the sky, hugging the horizon, or entirely below it — always keeping at
	// least a sliver of true sky/ground visible as a horizon reference.
	const rawMaxAlt = Math.max(...altitudes);
	const rawMinAlt = Math.min(...altitudes);
	const altPadding = Math.max((rawMaxAlt - rawMinAlt) * 0.25, 3);
	const maxAlt = Math.max(rawMaxAlt + altPadding, 5);
	const minAlt = Math.min(rawMinAlt - altPadding, -5);
	const altRange = maxAlt - minAlt;

	const xScale = (azimuthDeg: number) =>
		SIDE_MARGIN + ((azimuthDeg - minAz) / azRange) * (WIDTH - SIDE_MARGIN * 2);
	const yScale = (altitudeDeg: number) =>
		TOP_MARGIN + ((maxAlt - altitudeDeg) / altRange) * (HEIGHT - TOP_MARGIN - BOTTOM_MARGIN);

	const horizonY = yScale(0);
	const points = phases.map((phase) => ({
		...phase,
		x: xScale(phase.azimuthDeg),
		y: yScale(phase.altitudeDeg),
	}));
	const pathD = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
	const maxPoint = points.find((point) => point.label === 'Maximum');

	return (
		<svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="presentation">
			<rect x={0} y={0} width={WIDTH} height={horizonY} fill="var(--color-bg-elevated)" />
			<rect
				x={0}
				y={horizonY}
				width={WIDTH}
				height={HEIGHT - horizonY}
				fill="var(--color-surface)"
			/>
			<line
				x1={0}
				y1={horizonY}
				x2={WIDTH}
				y2={horizonY}
				stroke="var(--color-border)"
				strokeWidth={1.5}
			/>
			<g fill="var(--color-border)" opacity={0.6}>
				<rect x={20} y={horizonY - 14} width={18} height={14} />
				<rect x={45} y={horizonY - 24} width={14} height={24} />
				<rect x={66} y={horizonY - 10} width={20} height={10} />
				<rect x={WIDTH - 46} y={horizonY - 18} width={16} height={18} />
				<rect x={WIDTH - 68} y={horizonY - 30} width={20} height={30} />
				<rect x={WIDTH - 94} y={horizonY - 12} width={16} height={12} />
			</g>
			<path d={pathD} fill="none" stroke="var(--color-accent)" strokeWidth={1.5} strokeDasharray="4 3" />
			{points.map((point) => {
				const isMaximum = point.label === 'Maximum';
				const isBelowHorizon = point.altitudeDeg < 0;
				return (
					<circle
						key={point.label}
						cx={point.x}
						cy={point.y}
						r={isMaximum ? 6 : 4}
						fill={isMaximum ? 'var(--color-danger)' : 'var(--color-accent-strong)'}
						opacity={isBelowHorizon ? 0.4 : 1}
					/>
				);
			})}
			{maxPoint && (
				<text
					x={maxPoint.x}
					y={Math.max(maxPoint.y - 12, 12)}
					textAnchor="middle"
					className="fill-text text-[11px] font-semibold"
				>
					Maximum {formatTime(maxPoint.time)}
				</text>
			)}
		</svg>
	);
}
