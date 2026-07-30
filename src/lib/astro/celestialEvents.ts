import * as Astronomy from 'astronomy-engine';
import {
	EVENT_LOOKAHEAD_COUNT,
	SUPERMOON_MAX_DISTANCE_KM,
	SUPERMOON_SEARCH_CHAIN_LIMIT,
} from './constants';
import type { CelestialEvent, LunarEclipseEvent, SolarEclipseEvent, SupermoonEvent } from '../../types/events';

const FULL_MOON_QUARTER = 2;

function getUpcomingLunarEclipses(date: Date, count: number): LunarEclipseEvent[] {
	const events: LunarEclipseEvent[] = [];
	let eclipse = Astronomy.SearchLunarEclipse(date);

	while (events.length < count) {
		events.push({
			type: 'lunar-eclipse',
			id: `lunar-eclipse-${eclipse.peak.date.toISOString()}`,
			date: eclipse.peak.date,
			kind: eclipse.kind as LunarEclipseEvent['kind'],
			obscuration: eclipse.obscuration,
		});
		eclipse = Astronomy.NextLunarEclipse(eclipse.peak);
	}

	return events;
}

function getUpcomingSolarEclipses(date: Date, count: number): SolarEclipseEvent[] {
	const events: SolarEclipseEvent[] = [];
	let eclipse = Astronomy.SearchGlobalSolarEclipse(date);

	while (events.length < count) {
		events.push({
			type: 'solar-eclipse',
			id: `solar-eclipse-${eclipse.peak.date.toISOString()}`,
			date: eclipse.peak.date,
			kind: eclipse.kind as SolarEclipseEvent['kind'],
			latitude: eclipse.latitude,
			longitude: eclipse.longitude,
		});
		eclipse = Astronomy.NextGlobalSolarEclipse(eclipse.peak);
	}

	return events;
}

function getUpcomingSupermoons(date: Date, count: number): SupermoonEvent[] {
	const events: SupermoonEvent[] = [];
	let quarter = Astronomy.SearchMoonQuarter(date);

	for (let i = 0; i < SUPERMOON_SEARCH_CHAIN_LIMIT && events.length < count; i++) {
		if (quarter.quarter === FULL_MOON_QUARTER) {
			const distanceKm = Astronomy.Libration(quarter.time).dist_km;
			if (distanceKm < SUPERMOON_MAX_DISTANCE_KM) {
				events.push({
					type: 'supermoon',
					id: `supermoon-${quarter.time.date.toISOString()}`,
					date: quarter.time.date,
					distanceKm,
				});
			}
		}
		quarter = Astronomy.NextMoonQuarter(quarter);
	}

	return events;
}

export function getUpcomingEvents(date: Date, count: number = EVENT_LOOKAHEAD_COUNT): CelestialEvent[] {
	return [
		...getUpcomingLunarEclipses(date, count),
		...getUpcomingSolarEclipses(date, count),
		...getUpcomingSupermoons(date, count),
	].sort((a, b) => a.date.getTime() - b.date.getTime());
}
