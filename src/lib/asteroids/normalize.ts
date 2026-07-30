import { getRiskLevel } from './riskLevel';
import type { NeoFeedResponse, NormalizedAsteroid, RawNearEarthObject } from './types';

function normalizeOne(neo: RawNearEarthObject): NormalizedAsteroid | null {
	const approach = neo.close_approach_data[0];
	if (!approach) return null;

	const missDistanceLunar = Number(approach.miss_distance.lunar);
	const riskLevel = getRiskLevel(neo.is_potentially_hazardous_asteroid, missDistanceLunar);

	return {
		id: neo.id,
		name: neo.name,
		jplUrl: neo.nasa_jpl_url,
		isPotentiallyHazardous: neo.is_potentially_hazardous_asteroid,
		diameterMinKm: neo.estimated_diameter.kilometers.estimated_diameter_min,
		diameterMaxKm: neo.estimated_diameter.kilometers.estimated_diameter_max,
		closeApproachDate: approach.close_approach_date,
		velocityKmS: Number(approach.relative_velocity.kilometers_per_second),
		missDistanceLunar,
		missDistanceKm: Number(approach.miss_distance.kilometers),
		riskLevel,
	};
}

export function normalizeNeoFeed(feed: NeoFeedResponse): NormalizedAsteroid[] {
	return Object.values(feed.near_earth_objects)
		.flat()
		.map(normalizeOne)
		.filter((asteroid): asteroid is NormalizedAsteroid => asteroid !== null)
		.sort(
			(a, b) =>
				a.closeApproachDate.localeCompare(b.closeApproachDate) ||
				a.missDistanceLunar - b.missDistanceLunar,
		);
}
