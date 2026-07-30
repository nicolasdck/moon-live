export interface Coordinates {
	latitude: number;
	longitude: number;
}

export interface ApsisEvent {
	kind: 'perigee' | 'apogee';
	time: Date;
	distanceKm: number;
}

export interface RiseSetTimes {
	rise: Date | null;
	set: Date | null;
}

export interface MoonSnapshot {
	computedAt: Date;
	illuminationFraction: number;
	phaseAngleDeg: number;
	ageDays: number;
	distanceKm: number;
	orbitalSpeedKmS: number;
	libration: {
		latitudeDeg: number;
		longitudeDeg: number;
	};
	apparentDiameterDeg: number;
	nextPerigee: ApsisEvent;
	nextApogee: ApsisEvent;
	riseSet: RiseSetTimes;
	gravityRelativeToAverage: number;
	tidalRange: 'spring' | 'neap' | 'intermediate';
	nearestFullMoon: {
		date: Date;
		isPast: boolean;
	};
}
