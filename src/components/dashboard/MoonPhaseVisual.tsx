import { getMoonPhaseLitPath } from '../../lib/astro/moonPhaseGeometry';

interface MoonPhaseVisualProps {
	phaseAngleDeg: number;
	illuminationFraction: number;
	size?: number;
}

export function MoonPhaseVisual({
	phaseAngleDeg,
	illuminationFraction,
	size = 120,
}: MoonPhaseVisualProps) {
	const r = size / 2 - 2;
	const cx = size / 2;
	const cy = size / 2;
	const litPath = getMoonPhaseLitPath(cx, cy, r, phaseAngleDeg, illuminationFraction);

	return (
		<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="presentation">
			<defs>
				<radialGradient id="moon-dark" cx="35%" cy="30%" r="75%">
					<stop offset="0%" stopColor="#1c2140" />
					<stop offset="100%" stopColor="#080a16" />
				</radialGradient>
				<radialGradient id="moon-lit" cx="35%" cy="30%" r="75%">
					<stop offset="0%" stopColor="#fdfbf5" />
					<stop offset="55%" stopColor="#e4dfd2" />
					<stop offset="100%" stopColor="#b9b3a3" />
				</radialGradient>
			</defs>
			<circle cx={cx} cy={cy} r={r} fill="url(#moon-dark)" stroke="var(--color-border)" />
			<path d={litPath} fill="url(#moon-lit)" />
		</svg>
	);
}
