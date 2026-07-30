import { motion } from 'framer-motion';
import { MoonPhaseCard } from '../components/dashboard/MoonPhaseCard';
import { FullMoonNameCard } from '../components/dashboard/FullMoonNameCard';
import { MoonDistanceCard } from '../components/dashboard/MoonDistanceCard';
import { MoonRiseSetCard } from '../components/dashboard/MoonRiseSetCard';
import { MoonOrbitCard } from '../components/dashboard/MoonOrbitCard';
import { EarthMoonInteractionsCard } from '../components/dashboard/EarthMoonInteractionsCard';
import { GeolocationPrompt } from '../components/dashboard/GeolocationPrompt';
import { useGeolocation } from '../hooks/useGeolocation';
import { useMoonData } from '../hooks/useMoonData';

export default function DashboardPage() {
	const geolocation = useGeolocation();
	const snapshot = useMoonData(geolocation.coordinates);

	return (
		<>
			<GeolocationPrompt geolocation={geolocation} />
			<motion.div
				className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: 'easeOut' }}
			>
				<MoonPhaseCard snapshot={snapshot} />
				<FullMoonNameCard snapshot={snapshot} />
				<MoonDistanceCard snapshot={snapshot} />
				<MoonRiseSetCard riseSet={snapshot.riseSet} geolocation={geolocation} />
				<MoonOrbitCard snapshot={snapshot} />
				<div className="sm:col-span-2">
					<EarthMoonInteractionsCard snapshot={snapshot} />
				</div>
			</motion.div>
		</>
	);
}
