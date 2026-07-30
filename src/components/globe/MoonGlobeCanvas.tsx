import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { MoonMesh } from './MoonMesh';
import { LandmarkMarkers } from './LandmarkMarkers';

export function MoonGlobeCanvas() {
	return (
		<Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
			<ambientLight intensity={0.15} />
			<directionalLight position={[5, 2, 5]} intensity={2} />
			<Stars radius={50} depth={30} count={3000} factor={3} fade speed={0.5} />
			<MoonMesh />
			<LandmarkMarkers />
			<OrbitControls enablePan={false} minDistance={3} maxDistance={9} />
		</Canvas>
	);
}
