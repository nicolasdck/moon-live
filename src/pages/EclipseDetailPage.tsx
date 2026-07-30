import { useMemo } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';
import { reconstructEclipseEvent } from '../lib/astro/celestialEvents';
import {
	getLunarEclipseLocalPhases,
	getSolarEclipseLocalCircumstances,
} from '../lib/astro/eclipseLocalCircumstances';
import { getEventTitleAndDetail } from '../lib/astro/eventPresentation';
import { EclipseSkyPathChart } from '../components/eclipse/EclipseSkyPathChart';
import { EclipseProgramList } from '../components/eclipse/EclipseProgramList';
import { formatFullDate } from '../lib/format';
import type { LunarEclipseEvent, SolarEclipseEvent } from '../types/events';

function isEclipseEvent(value: unknown): value is LunarEclipseEvent | SolarEclipseEvent {
	return (
		typeof value === 'object' &&
		value !== null &&
		'type' in value &&
		((value as { type?: string }).type === 'lunar-eclipse' ||
			(value as { type?: string }).type === 'solar-eclipse')
	);
}

export default function EclipseDetailPage() {
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const geolocation = useGeolocation();

	const event = useMemo(() => {
		const stateEvent = (location.state as { event?: unknown } | null)?.event;
		if (isEclipseEvent(stateEvent)) return stateEvent;

		const type = searchParams.get('type');
		const dateParam = searchParams.get('date');
		if ((type === 'lunar-eclipse' || type === 'solar-eclipse') && dateParam) {
			return reconstructEclipseEvent(type, new Date(dateParam));
		}
		return null;
	}, [location.state, searchParams]);

	const circumstances = useMemo(() => {
		if (!event) return null;
		return event.type === 'lunar-eclipse'
			? getLunarEclipseLocalPhases(event, geolocation.coordinates)
			: getSolarEclipseLocalCircumstances(event, geolocation.coordinates);
	}, [event, geolocation.coordinates]);

	const notVisibleMessage = useMemo(() => {
		if (!event || !circumstances) return null;
		if (circumstances.visible === false) {
			return "Cette éclipse solaire n'est pas visible depuis votre position — elle ne l'est que depuis une bande étroite à la surface terrestre. Elle reste visible depuis d'autres régions du globe.";
		}
		const allBelowHorizon = circumstances.phases.every((phase) => phase.altitudeDeg < 0);
		if (!allBelowHorizon) return null;
		return event.type === 'lunar-eclipse'
			? "La Lune reste sous l'horizon pendant toute la durée de cette éclipse depuis votre position — non visible localement, même si l'éclipse a bien lieu ailleurs sur le globe nocturne."
			: "Le Soleil est sous l'horizon pendant toute la durée de cet événement depuis votre position — non visible localement.";
	}, [event, circumstances]);

	return (
		<div className="flex flex-col gap-5">
			<Link
				to="/calendrier"
				className="flex w-fit items-center gap-2 text-sm text-text-muted hover:text-text"
			>
				<ArrowLeft size={16} />
				Retour au calendrier
			</Link>

			{!event ? (
				<p className="text-center text-sm text-text-muted">
					Événement introuvable — retournez au calendrier pour en choisir un.
				</p>
			) : (
				<>
					<div>
						<h1 className="text-xl font-semibold text-text">{getEventTitleAndDetail(event).title}</h1>
						<p className="text-sm text-text-muted">{formatFullDate(event.date)}</p>
						{geolocation.isFallback && (
							<p className="mt-1 text-xs text-text-muted">
								Position par défaut (Paris) — activez la géolocalisation pour votre position exacte.
							</p>
						)}
					</div>

					{notVisibleMessage ? (
						<div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-8 text-center">
							<AlertTriangle size={28} className="text-warn" />
							<p className="text-sm text-text-muted">{notVisibleMessage}</p>
						</div>
					) : (
						circumstances &&
						circumstances.visible !== false && (
							<div className="flex flex-col gap-5">
								<div className="rounded-2xl border border-border bg-surface p-4">
									<EclipseSkyPathChart phases={circumstances.phases} />
								</div>
								<EclipseProgramList phases={circumstances.phases} />
							</div>
						)
					)}
				</>
			)}
		</div>
	);
}
