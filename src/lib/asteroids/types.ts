// Raw NASA NeoWs response shape. `relative_velocity` and `miss_distance`
// fields are numeric strings in the API, not numbers — see normalize.ts.
export interface NeoFeedResponse {
	element_count: number;
	near_earth_objects: Record<string, RawNearEarthObject[]>;
}

export interface RawNearEarthObject {
	id: string;
	name: string;
	nasa_jpl_url: string;
	is_potentially_hazardous_asteroid: boolean;
	estimated_diameter: {
		kilometers: {
			estimated_diameter_min: number;
			estimated_diameter_max: number;
		};
	};
	close_approach_data: RawCloseApproach[];
}

export interface RawCloseApproach {
	close_approach_date: string;
	relative_velocity: {
		kilometers_per_second: string;
	};
	miss_distance: {
		lunar: string;
		kilometers: string;
	};
}

export type RiskLevel = 'faible' | 'modéré' | 'élevé';

export interface NormalizedAsteroid {
	id: string;
	name: string;
	jplUrl: string;
	isPotentiallyHazardous: boolean;
	diameterMinKm: number;
	diameterMaxKm: number;
	closeApproachDate: string;
	velocityKmS: number;
	missDistanceLunar: number;
	missDistanceKm: number;
	riskLevel: RiskLevel;
}
