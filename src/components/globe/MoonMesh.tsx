import { useTexture } from '@react-three/drei';

export const MOON_RADIUS = 2;

export function MoonMesh() {
	// The same color texture is reused as a bump map for a cheap relief effect
	// (maria are darker/lower, bright crater rims read as raised) — this is an
	// approximation, not a real elevation dataset (e.g. LOLA), and is limited
	// to a subtle bumpScale to avoid obviously wrong shading.
	const texture = useTexture('/textures/moon-2k.jpg');

	return (
		<mesh>
			<sphereGeometry args={[MOON_RADIUS, 64, 64]} />
			<meshStandardMaterial map={texture} bumpMap={texture} bumpScale={0.03} roughness={1} />
		</mesh>
	);
}
