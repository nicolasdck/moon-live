import { useState } from 'react';
import { Html } from '@react-three/drei';
import { LANDMARKS, type Landmark, type LandmarkKind } from '../../lib/moon/landmarks';
import { geoToVector3 } from '../../lib/moon/geoToVector3';
import { MOON_RADIUS } from './MoonMesh';

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
							setActive(landmark);
						}}
						onPointerOut={(event) => {
							event.stopPropagation();
							setActive((current) => (current === landmark ? null : current));
						}}
						onClick={(event) => {
							event.stopPropagation();
							setActive(landmark);
						}}
					>
						<sphereGeometry args={[0.025, 8, 8]} />
						<meshBasicMaterial color={MARKER_COLOR[landmark.kind]} />
						{isActive && (
							<Html distanceFactor={6} style={{ pointerEvents: 'none' }}>
								<div className="w-56 -translate-x-1/2 -translate-y-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-text shadow-xl">
									<p className="font-semibold text-text">{landmark.name}</p>
									<p className="text-text-muted">
										{landmark.latitude.toFixed(2)}°, {landmark.longitude.toFixed(2)}°
										{landmark.isApproximate ? ' (approx.)' : ''}
									</p>
									<p className="mt-1 text-text-muted">{landmark.description}</p>
								</div>
							</Html>
						)}
					</mesh>
				);
			})}
		</group>
	);
}
