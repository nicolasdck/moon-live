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
	const waxing = phaseAngleDeg < 180;
	const outerSweep = waxing ? 1 : 0;
	const terminatorRx = Math.abs(r * Math.cos((phaseAngleDeg * Math.PI) / 180));
	// The terminator arc runs bottom->top (opposite direction from the outer
	// arc's top->bottom), so the same sweep-flag value traces the opposite
	// side. For a crescent (thin lit sliver) it must bulge the same side as
	// the outer arc, i.e. the flipped flag; for a gibbous (thin dark sliver)
	// it must bulge the opposite side, i.e. the same flag value.
	const terminatorSweep = illuminationFraction < 0.5 ? (outerSweep === 1 ? 0 : 1) : outerSweep;

	const litPath = [
		`M ${cx} ${cy - r}`,
		`A ${r} ${r} 0 0 ${outerSweep} ${cx} ${cy + r}`,
		`A ${terminatorRx} ${r} 0 0 ${terminatorSweep} ${cx} ${cy - r}`,
		'Z',
	].join(' ');

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
