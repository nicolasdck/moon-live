export function formatPercent(fraction: number): string {
	return new Intl.NumberFormat('fr-FR', { style: 'percent', maximumFractionDigits: 1 }).format(
		fraction,
	);
}

export function formatNumber(value: number, maximumFractionDigits = 0): string {
	return new Intl.NumberFormat('fr-FR', { maximumFractionDigits }).format(value);
}

export function formatTime(date: Date | null): string {
	if (!date) return '—';
	return new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(date);
}

export function formatDayMonth(date: Date): string {
	return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' }).format(date);
}
