import { getMoonPhaseLitPath } from '../../lib/astro/moonPhaseGeometry';

interface MiniMoonPhaseIconProps {
	phaseAngleDeg: number;
	illuminationFraction: number;
	size?: number;
}

export function MiniMoonPhaseIcon({
	phaseAngleDeg,
	illuminationFraction,
	size = 28,
}: MiniMoonPhaseIconProps) {
	const r = size / 2 - 1;
	const cx = size / 2;
	const cy = size / 2;
	const litPath = getMoonPhaseLitPath(cx, cy, r, phaseAngleDeg, illuminationFraction);

	return (
		<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="presentation">
			<circle cx={cx} cy={cy} r={r} fill="#12142a" stroke="var(--color-border)" strokeWidth={0.75} />
			<path d={litPath} fill="#e4dfd2" />
		</svg>
	);
}
