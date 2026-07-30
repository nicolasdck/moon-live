import { LocateFixed, LocateOff } from 'lucide-react';
import type { GeolocationState } from '../../hooks/useGeolocation';

export function GeolocationPrompt({ geolocation }: { geolocation: GeolocationState }) {
	if (geolocation.status === 'granted' || geolocation.status === 'idle') return null;

	const message =
		geolocation.status === 'locating'
			? 'Localisation en cours…'
			: geolocation.status === 'denied'
				? "Géolocalisation refusée — les heures de lever/coucher utilisent Paris par défaut."
				: "Géolocalisation non disponible sur cet appareil — Paris est utilisé par défaut.";

	return (
		<div className="mb-6 flex items-center gap-2 rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm text-text-muted">
			{geolocation.status === 'locating' ? (
				<LocateFixed size={16} className="animate-pulse text-accent" />
			) : (
				<LocateOff size={16} className="text-warn" />
			)}
			{message}
		</div>
	);
}
