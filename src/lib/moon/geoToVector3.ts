import { Vector3 } from 'three';

const DEG2RAD = Math.PI / 180;

/**
 * Converts selenographic latitude/longitude (degrees, East-positive) into a
 * position on a sphere of the given radius, matching the UV mapping of a
 * standard equirectangular planet texture (prime meridian at the texture's
 * horizontal center, seam at the back).
 */
export function geoToVector3(latitude: number, longitude: number, radius: number): Vector3 {
	const phi = (90 - latitude) * DEG2RAD;
	const theta = (longitude + 180) * DEG2RAD;

	return new Vector3(
		-radius * Math.sin(phi) * Math.cos(theta),
		radius * Math.cos(phi),
		radius * Math.sin(phi) * Math.sin(theta),
	);
}
