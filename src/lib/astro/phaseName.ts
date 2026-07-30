export function getPhaseName(phaseAngleDeg: number): string {
	const normalized = ((phaseAngleDeg % 360) + 360) % 360;

	if (normalized < 11.25 || normalized >= 348.75) return 'Nouvelle lune';
	if (normalized < 78.75) return 'Premier croissant';
	if (normalized < 101.25) return 'Premier quartier';
	if (normalized < 168.75) return 'Lune gibbeuse croissante';
	if (normalized < 191.25) return 'Pleine lune';
	if (normalized < 258.75) return 'Lune gibbeuse décroissante';
	if (normalized < 281.25) return 'Dernier quartier';
	return 'Dernier croissant';
}
