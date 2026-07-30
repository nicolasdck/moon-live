import { useState } from 'react';
import { Html } from '@react-three/drei';
import { X } from 'lucide-react';
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
								<div className="pointer-events-auto relative w-48 max-w-[70vw] -translate-y-[calc(100%+14px)] rounded-lg border border-border bg-surface px-3 py-2 text-xs text-text shadow-xl">
									<button
										type="button"
										onClick={(event) => {
											event.stopPropagation();
											setActive(null);
										}}
										aria-label="Fermer"
										className="absolute top-1.5 right-1.5 text-text-muted hover:text-text"
									>
										<X size={12} />
									</button>
									<p className="pr-4 font-semibold text-text">{landmark.name}</p>
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
