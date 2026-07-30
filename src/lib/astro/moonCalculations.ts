import * as Astronomy from 'astronomy-engine';
import type { ApsisEvent, Coordinates, MoonSnapshot, RiseSetTimes } from '../../types/moon';
import {
	APSIS_SEARCH_CHAIN_LIMIT,
	AVERAGE_EARTH_MOON_DISTANCE_KM,
	RISE_SET_SEARCH_WINDOW_DAYS,
	SYNODIC_MONTH_DAYS,
} from './constants';

const RISE_DIRECTION = 1;
const SET_DIRECTION = -1;

function getMoonAgeDays(phaseAngleDeg: number): number {
	return (phaseAngleDeg / 360) * SYNODIC_MONTH_DAYS;
}

function getOrbitalSpeedKmS(date: Date): number {
	const state = Astronomy.GeoMoonState(date);
	const speedAuPerDay = Math.hypot(state.vx, state.vy, state.vz);
	const kmPerAu = 149_597_870.7;
	const secondsPerDay = 86_400;
	return (speedAuPerDay * kmPerAu) / secondsPerDay;
}

function findNextApsides(date: Date): { perigee: ApsisEvent; apogee: ApsisEvent } {
	let apsis = Astronomy.SearchLunarApsis(date);
	let perigee: ApsisEvent | undefined;
	let apogee: ApsisEvent | undefined;

	for (let i = 0; i < APSIS_SEARCH_CHAIN_LIMIT && (!perigee || !apogee); i++) {
		const isPerigee = apsis.kind === Astronomy.ApsisKind.Pericenter;
		if (isPerigee && !perigee) {
			perigee = { kind: 'perigee', time: apsis.time.date, distanceKm: apsis.dist_km };
		} else if (!isPerigee && !apogee) {
			apogee = { kind: 'apogee', time: apsis.time.date, distanceKm: apsis.dist_km };
		}
		apsis = Astronomy.NextLunarApsis(apsis);
	}

	if (!perigee || !apogee) {
		throw new Error('Unable to resolve upcoming lunar apsides');
	}

	return { perigee, apogee };
}

function getRiseSet(date: Date, coordinates: Coordinates): RiseSetTimes {
	const observer = new Astronomy.Observer(coordinates.latitude, coordinates.longitude, 0);
	const rise = Astronomy.SearchRiseSet(
		Astronomy.Body.Moon,
		observer,
		RISE_DIRECTION,
		date,
		RISE_SET_SEARCH_WINDOW_DAYS,
	);
	const set = Astronomy.SearchRiseSet(
		Astronomy.Body.Moon,
		observer,
		SET_DIRECTION,
		date,
		RISE_SET_SEARCH_WINDOW_DAYS,
	);

	return {
		rise: rise ? rise.date : null,
		set: set ? set.date : null,
	};
}

function getTidalRange(phaseAngleDeg: number): MoonSnapshot['tidalRange'] {
	const distanceFromSyzygy = Math.min(
		Math.abs(phaseAngleDeg - 0),
		Math.abs(phaseAngleDeg - 180),
		Math.abs(phaseAngleDeg - 360),
	);
	const distanceFromQuadrature = Math.min(Math.abs(phaseAngleDeg - 90), Math.abs(phaseAngleDeg - 270));

	if (distanceFromSyzygy <= 22.5) return 'spring';
	if (distanceFromQuadrature <= 22.5) return 'neap';
	return 'intermediate';
}

export function computeMoonSnapshot(date: Date, coordinates: Coordinates): MoonSnapshot {
	// `Illumination().phase_angle` (0-180) only measures how lit the disk looks and is
	// ambiguous between waxing/waning. `MoonPhase()` (0-360, 0=new, 180=full) is the
	// ecliptic-longitude phase and is what age-of-moon/tide logic needs.
	const illumination = Astronomy.Illumination(Astronomy.Body.Moon, date);
	const eclipticPhaseDeg = Astronomy.MoonPhase(date);
	const libration = Astronomy.Libration(date);
	const { perigee, apogee } = findNextApsides(date);
	const riseSet = getRiseSet(date, coordinates);
	const gravityRelativeToAverage = (AVERAGE_EARTH_MOON_DISTANCE_KM / libration.dist_km) ** 2;

	return {
		computedAt: date,
		illuminationFraction: illumination.phase_fraction,
		phaseAngleDeg: eclipticPhaseDeg,
		ageDays: getMoonAgeDays(eclipticPhaseDeg),
		distanceKm: libration.dist_km,
		orbitalSpeedKmS: getOrbitalSpeedKmS(date),
		libration: {
			latitudeDeg: libration.elat,
			longitudeDeg: libration.elon,
		},
		apparentDiameterDeg: libration.diam_deg,
		nextPerigee: perigee,
		nextApogee: apogee,
		riseSet,
		gravityRelativeToAverage,
		tidalRange: getTidalRange(eclipticPhaseDeg),
	};
}
