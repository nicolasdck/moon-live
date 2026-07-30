export interface LunarEclipseEvent {
	type: 'lunar-eclipse';
	id: string;
	date: Date;
	kind: 'penumbral' | 'partial' | 'total';
	obscuration: number;
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
