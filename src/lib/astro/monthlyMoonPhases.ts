import * as Astronomy from 'astronomy-engine';
import { getUpcomingEvents } from './celestialEvents';
import type { CelestialEvent } from '../../types/events';

const QUARTER_LABELS = [
	'Nouvelle lune',
	'Premier quartier',
	'Pleine lune',
	'Dernier quartier',
] as const;

// A month holds at most 4-5 quarters; a small margin covers edge cases
// where a quarter lands right at a month boundary.
const MONTH_QUARTER_CHAIN_LIMIT = 6;

// Eclipses are rare and supermoons cluster a few times a year, so a modest
// per-type lookahead from the month start is enough to catch anything that
// falls inside the displayed month without an unbounded search.
const MONTH_EVENT_LOOKAHEAD_COUNT = 12;

export interface DailyMoonPhase {
	date: Date;
	illuminationFraction: number;
	phaseAngleDeg: number;
}

export interface MonthQuarter {
	date: Date;
	label: (typeof QUARTER_LABELS)[number];
}

export function getDailyMoonPhases(year: number, month: number): DailyMoonPhase[] {
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	return Array.from({ length: daysInMonth }, (_, index) => {
		// Noon avoids any date-boundary ambiguity from timezone offsets.
		const date = new Date(year, month, index + 1, 12);
		return {
			date,
			illuminationFraction: Astronomy.Illumination(Astronomy.Body.Moon, date).phase_fraction,
			phaseAngleDeg: Astronomy.MoonPhase(date),
		};
	});
}

export function getMoonQuartersInMonth(year: number, month: number): MonthQuarter[] {
	const monthStart = new Date(year, month, 1);
	const monthEnd = new Date(year, month + 1, 1);
	const quarters: MonthQuarter[] = [];

	let quarter = Astronomy.SearchMoonQuarter(monthStart);
	for (let i = 0; i < MONTH_QUARTER_CHAIN_LIMIT && quarter.time.date < monthEnd; i++) {
		quarters.push({ date: quarter.time.date, label: QUARTER_LABELS[quarter.quarter] });
		quarter = Astronomy.NextMoonQuarter(quarter);
	}
	return quarters;
}

export function getEventsInMonth(year: number, month: number): CelestialEvent[] {
	const monthStart = new Date(year, month, 1);
	const monthEnd = new Date(year, month + 1, 1);
	return getUpcomingEvents(monthStart, MONTH_EVENT_LOOKAHEAD_COUNT).filter(
		(event) => event.date >= monthStart && event.date < monthEnd,
	);
}
