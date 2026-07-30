import * as Astronomy from 'astronomy-engine';
import type { Coordinates } from '../../types/moon';
import type { LunarEclipseEvent, SolarEclipseEvent } from '../../types/events';

export interface EclipseLocalPhase {
	label: string;
	time: Date;
	altitudeDeg: number;
	azimuthDeg: number;
}

export type LunarEclipseLocalCircumstances = { visible: true; phases: EclipseLocalPhase[] };

export type SolarEclipseLocalCircumstances =
	| { visible: true; phases: EclipseLocalPhase[] }
	| { visible: false };

// If SearchLocalSolarEclipse's result lands more than this far from the
// globally-known eclipse date, it found a *different* (later) eclipse —
// meaning the requested one isn't visible from this location at all.
const MAX_DATE_DIVERGENCE_MS = 5 * 86_400_000;

const MINUTE_MS = 60_000;
const DAY_MS = 86_400_000;

function toObserver(coordinates: Coordinates): Astronomy.Observer {
	return new Astronomy.Observer(coordinates.latitude, coordinates.longitude, 0);
}

export function getBodyAltAz(
	body: Astronomy.Body,
	date: Date,
	observer: Astronomy.Observer,
): { altitudeDeg: number; azimuthDeg: number } {
	const equatorial = Astronomy.Equator(body, date, observer, true, true);
	const horizontal = Astronomy.Horizon(date, observer, equatorial.ra, equatorial.dec, 'normal');
	return { altitudeDeg: horizontal.altitude, azimuthDeg: horizontal.azimuth };
}

export function getLunarEclipseLocalPhases(
	event: LunarEclipseEvent,
	coordinates: Coordinates,
): LunarEclipseLocalCircumstances {
	const observer = toObserver(coordinates);
	const peakMs = event.date.getTime();

	const offsets: { label: string; minutes: number }[] = [
		{ label: 'Début pénombrale', minutes: -event.sdPenumMinutes },
		...(event.sdPartialMinutes > 0
			? [{ label: 'Début partielle', minutes: -event.sdPartialMinutes }]
			: []),
		...(event.sdTotalMinutes > 0 ? [{ label: 'Début totale', minutes: -event.sdTotalMinutes }] : []),
		{ label: 'Maximum', minutes: 0 },
		...(event.sdTotalMinutes > 0 ? [{ label: 'Fin totale', minutes: event.sdTotalMinutes }] : []),
		...(event.sdPartialMinutes > 0
			? [{ label: 'Fin partielle', minutes: event.sdPartialMinutes }]
			: []),
		{ label: 'Fin pénombrale', minutes: event.sdPenumMinutes },
	];

	const phases = offsets.map(({ label, minutes }) => {
		const time = new Date(peakMs + minutes * MINUTE_MS);
		return { label, time, ...getBodyAltAz(Astronomy.Body.Moon, time, observer) };
	});

	return { visible: true, phases };
}

export function getSolarEclipseLocalCircumstances(
	event: SolarEclipseEvent,
	coordinates: Coordinates,
): SolarEclipseLocalCircumstances {
	const observer = toObserver(coordinates);
	const searchStart = new Date(event.date.getTime() - 3 * DAY_MS);
	const local = Astronomy.SearchLocalSolarEclipse(searchStart, observer);

	if (Math.abs(local.peak.time.date.getTime() - event.date.getTime()) > MAX_DATE_DIVERGENCE_MS) {
		return { visible: false };
	}

	const named: { label: string; phaseEvent: Astronomy.EclipseEvent | undefined }[] = [
		{ label: 'Début partielle', phaseEvent: local.partial_begin },
		{ label: 'Début totale/annulaire', phaseEvent: local.total_begin },
		{ label: 'Maximum', phaseEvent: local.peak },
		{ label: 'Fin totale/annulaire', phaseEvent: local.total_end },
		{ label: 'Fin partielle', phaseEvent: local.partial_end },
	];

	const phases = named
		.filter((entry): entry is { label: string; phaseEvent: Astronomy.EclipseEvent } =>
			Boolean(entry.phaseEvent),
		)
		.map(({ label, phaseEvent }) => {
			const time = phaseEvent.time.date;
			const { azimuthDeg } = getBodyAltAz(Astronomy.Body.Sun, time, observer);
			return { label, time, altitudeDeg: phaseEvent.altitude, azimuthDeg };
		});

	return { visible: true, phases };
}
