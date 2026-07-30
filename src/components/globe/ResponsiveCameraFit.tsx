import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { PerspectiveCamera } from 'three';
import { MOON_RADIUS } from './MoonMesh';

const FIT_PADDING = 1.2;

// Runs once on mount to position the camera so the whole Moon fits within the
// canvas, accounting for its actual aspect ratio (a narrow/portrait canvas
// needs the camera further back than a wide one, since a fixed vertical FOV
// alone can clip the sphere horizontally). Deliberately only runs once — it
// must not fight the user's own zoom/pan after the initial fit.
export function ResponsiveCameraFit() {
	const { camera, size } = useThree();
	const hasFitted = useRef(false);

	useEffect(() => {
		if (hasFitted.current) return;
		if (!(camera instanceof PerspectiveCamera)) return;
		if (size.width === 0 || size.height === 0) return;

		hasFitted.current = true;
		const aspect = size.width / size.height;
		const fovRad = (camera.fov * Math.PI) / 180;
		const verticalDistance = MOON_RADIUS / Math.tan(fovRad / 2);
		const distance = (verticalDistance / Math.min(1, aspect)) * FIT_PADDING;

		camera.position.set(0, 0, distance);
		camera.updateProjectionMatrix();
	}, [camera, size]);

	return null;
}
