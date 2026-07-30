export interface LunarEclipseEvent {
	type: 'lunar-eclipse';
	id: string;
	date: Date;
	kind: 'penumbral' | 'partial' | 'total';
	obscuration: number;
	// Semi-durations (minutes) of each phase around `date` (the peak), as
	// returned by astronomy-engine's SearchLunarEclipse — 0 if the eclipse
	// never reaches that phase. Used to derive local begin/end circumstances
	// without re-searching (see lib/astro/eclipseLocalCircumstances.ts).
	sdPenumMinutes: number;
	sdPartialMinutes: number;
	sdTotalMinutes: number;
}

export interface SolarEclipseEvent {
	type: 'solar-eclipse';
	id: string;
	date: Date;
	kind: 'partial' | 'annular' | 'total';
	latitude?: number;
	longitude?: number;
}

export interface SupermoonEvent {
	type: 'supermoon';
	id: string;
	date: Date;
	distanceKm: number;
}

export type CelestialEvent = LunarEclipseEvent | SolarEclipseEvent | SupermoonEvent;
