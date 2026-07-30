import { useTexture } from '@react-three/drei';

export const MOON_RADIUS = 2;

export function MoonMesh() {
	// Real NASA data: LRO/LROC WAC photographic color mosaic + a real LOLA-derived
	// elevation map as the bump source (NASA SVS "CGI Moon Kit", svs.gsfc.nasa.gov/4720).
	// Known limitation of the source data itself: WAC color coverage is 70°N-70°S;
	// the poles are filled in with lower-resolution monochrome LOLA-albedo data,
	// visible as a slightly different-looking band near the top/bottom edges.
	const [colorMap, bumpMap] = useTexture([
		'/textures/moon-lroc-color-2k.jpg',
		'/textures/moon-lola-elevation-1k.jpg',
	]);

	return (
		<mesh>
			<sphereGeometry args={[MOON_RADIUS, 64, 64]} />
			<meshStandardMaterial map={colorMap} bumpMap={bumpMap} bumpScale={0.03} roughness={1} />
		</mesh>
	);
}
