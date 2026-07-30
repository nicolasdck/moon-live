import { useState } from 'react';
import { Html } from '@react-three/drei';
import { LANDMARKS, type Landmark, type LandmarkKind } from '../../lib/moon/landmarks';
import { geoToVector3 } from '../../lib/moon/geoToVector3';
import { MOON_RADIUS } from './MoonMesh';
import { LandmarkTooltip } from './LandmarkTooltip';

const MARKER_COLOR: Record<LandmarkKind, string> = {
	crater: '#9ca3af',
	apollo: '#f2c94c',
	'artemis-candidate': '#ff8a4c',
};

const MARKER_RADIUS = MOON_RADIUS * 1.01;

export function LandmarkMarkers() {
	const [active, setActive] = useState<Landmark | null>(null);

	return (
		<group>
			{LANDMARKS.map((landmark) => {
				const position = geoToVector3(landmark.latitude, landmark.longitude, MARKER_RADIUS);
				const isActive = active === landmark;

				return (
					<mesh
						key={landmark.name}
						position={position}
						onPointerOver={(event) => {
							event.stopPropagation();
							document.body.style.cursor = 'pointer';
						}}
						onPointerOut={(event) => {
							event.stopPropagation();
							document.body.style.cursor = 'auto';
						}}
						onClick={(event) => {
							event.stopPropagation();
							setActive((current) => (current === landmark ? null : landmark));
						}}
					>
						<sphereGeometry args={[0.025, 8, 8]} />
						<meshBasicMaterial color={MARKER_COLOR[landmark.kind]} />
						{isActive && (
							// No `distanceFactor`: with it, Html scales the overlay by
							// world-unit distance, which blows it up hugely on this small
							// (radius-2) sphere. Fixed screen-space size stays sane instead.
							<Html center style={{ pointerEvents: 'none' }}>
								<LandmarkTooltip landmark={landmark} onClose={() => setActive(null)} />
							</Html>
						)}
					</mesh>
				);
			})}
		</group>
	);
}
