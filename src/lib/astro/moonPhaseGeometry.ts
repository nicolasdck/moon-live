export function getMoonPhaseLitPath(
	cx: number,
	cy: number,
	r: number,
	phaseAngleDeg: number,
	illuminationFraction: number,
): string {
	const waxing = phaseAngleDeg < 180;
	const outerSweep = waxing ? 1 : 0;
	const terminatorRx = Math.abs(r * Math.cos((phaseAngleDeg * Math.PI) / 180));
	// The terminator arc runs bottom->top (opposite direction from the outer
	// arc's top->bottom), so the same sweep-flag value traces the opposite
	// side. For a crescent (thin lit sliver) it must bulge the same side as
	// the outer arc, i.e. the flipped flag; for a gibbous (thin dark sliver)
	// it must bulge the opposite side, i.e. the same flag value.
	const terminatorSweep = illuminationFraction < 0.5 ? (outerSweep === 1 ? 0 : 1) : outerSweep;

	return [
		`M ${cx} ${cy - r}`,
		`A ${r} ${r} 0 0 ${outerSweep} ${cx} ${cy + r}`,
		`A ${terminatorRx} ${r} 0 0 ${terminatorSweep} ${cx} ${cy - r}`,
		'Z',
	].join(' ');
}
