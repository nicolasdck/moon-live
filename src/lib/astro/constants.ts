export const SYNODIC_MONTH_DAYS = 29.530588853;

export const AU_KM = 149_597_870.7;

export const AVERAGE_EARTH_MOON_DISTANCE_KM = 384_400;

export const RISE_SET_SEARCH_WINDOW_DAYS = 2;

export const APSIS_SEARCH_CHAIN_LIMIT = 4;

export const FULL_MOON_SEARCH_LOOKBACK_DAYS = 40;

export const FULL_MOON_QUARTER_CHAIN_LIMIT = 6;

export const FULL_MOON_DISPLAY_WINDOW_DAYS = 3;

export const SUPERMOON_MAX_DISTANCE_KM = 360_000;

export const EVENT_LOOKAHEAD_COUNT = 6;

// Supermoons (perigee full moons) cluster a few times a year rather than
// every month, so the search needs a wide window (~2 years of quarters) to
// reliably surface several upcoming ones.
export const SUPERMOON_SEARCH_CHAIN_LIMIT = 100;

export const NOTIFICATION_WINDOW_HOURS = 48;

export const DEFAULT_OBSERVER_LOCATION = {
	latitude: 48.8566,
	longitude: 2.3522,
	label: 'Paris, France',
};
