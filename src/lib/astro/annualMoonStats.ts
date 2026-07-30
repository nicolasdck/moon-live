import * as Astronomy from 'astronomy-engine';
import {
	MICROMOON_MIN_DISTANCE_KM,
	SUPERMOON_MAX_DISTANCE_KM,
	YEAR_QUARTER_CHAIN_LIMIT,
} from './constants';

const FULL_MOON_QUARTER = 2;

export type FullMoonKind = 'supermoon' | 'micromoon' | 'standard';

export interface FullMoonOfYear {
	date: Date;
	distanceKm: number;
	kind: FullMoonKind;
}

export interface YearMoonStats {
	fullMoons: FullMoonOfYear[];
	closest: FullMoonOfYear;
	farthest: FullMoonOfYear;
	supermoonCount: number;
	micromoonCount: number;
}

function classifyDistance(distanceKm: number): FullMoonKind {
	if (distanceKm < SUPERMOON_MAX_DISTANCE_KM) return 'supermoon';
	if (distanceKm > MICROMOON_MIN_DISTANCE_KM) return 'micromoon';
	return 'standard';
}

export function getFullMoonsInYear(year: number): FullMoonOfYear[] {
	const yearStart = new Date(year, 0, 1);
	const yearEnd = new Date(year + 1, 0, 1);
	const fullMoons: FullMoonOfYear[] = [];

	let quarter = Astronomy.SearchMoonQuarter(yearStart);
	for (let i = 0; i < YEAR_QUARTER_CHAIN_LIMIT && quarter.time.date < yearEnd; i++) {
		if (quarter.quarter === FULL_MOON_QUARTER) {
			const distanceKm = Astronomy.Libration(quarter.time).dist_km;
			fullMoons.push({ date: quarter.time.date, distanceKm, kind: classifyDistance(distanceKm) });
		}
		quarter = Astronomy.NextMoonQuarter(quarter);
	}
	return fullMoons;
}

export function getYearMoonStats(year: number): YearMoonStats {
	const fullMoons = getFullMoonsInYear(year);
	const closest = fullMoons.reduce((min, moon) => (moon.distanceKm < min.distanceKm ? moon : min));
	const farthest = fullMoons.reduce((max, moon) => (moon.distanceKm > max.distanceKm ? moon : max));

	return {
		fullMoons,
		closest,
		farthest,
		supermoonCount: fullMoons.filter((moon) => moon.kind === 'supermoon').length,
		micromoonCount: fullMoons.filter((moon) => moon.kind === 'micromoon').length,
	};
}
