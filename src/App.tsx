import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AppShell } from './components/layout/AppShell';
import { AppLoader } from './components/layout/AppLoader';
import { MoonPhaseCard } from './components/dashboard/MoonPhaseCard';
import { MoonDistanceCard } from './components/dashboard/MoonDistanceCard';
import { MoonRiseSetCard } from './components/dashboard/MoonRiseSetCard';
import { MoonOrbitCard } from './components/dashboard/MoonOrbitCard';
import { EarthMoonInteractionsCard } from './components/dashboard/EarthMoonInteractionsCard';
import { GeolocationPrompt } from './components/dashboard/GeolocationPrompt';
import { useGeolocation } from './hooks/useGeolocation';
import { useMoonData } from './hooks/useMoonData';

const INITIAL_LOAD_DELAY_MS = 600;

function App() {
	const [isReady, setIsReady] = useState(false);
	const geolocation = useGeolocation();
	const snapshot = useMoonData(geolocation.coordinates);

	useEffect(() => {
		const timeoutId = window.setTimeout(() => setIsReady(true), INITIAL_LOAD_DELAY_MS);
		return () => window.clearTimeout(timeoutId);
	}, []);

	if (!isReady) {
		return <AppLoader />;
	}

	return (
		<AppShell>
			<GeolocationPrompt geolocation={geolocation} />
			<motion.div
				className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: 'easeOut' }}
			>
				<MoonPhaseCard snapshot={snapshot} />
				<MoonDistanceCard snapshot={snapshot} />
				<MoonRiseSetCard riseSet={snapshot.riseSet} geolocation={geolocation} />
				<MoonOrbitCard snapshot={snapshot} />
				<div className="sm:col-span-2">
					<EarthMoonInteractionsCard snapshot={snapshot} />
				</div>
			</motion.div>
		</AppShell>
	);
}

export default App;
