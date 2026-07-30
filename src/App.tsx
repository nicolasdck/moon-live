import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { AppLoader } from './components/layout/AppLoader';
import DashboardPage from './pages/DashboardPage';

const GlobePage = lazy(() => import('./pages/GlobePage'));

const INITIAL_LOAD_DELAY_MS = 600;

function App() {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const timeoutId = window.setTimeout(() => setIsReady(true), INITIAL_LOAD_DELAY_MS);
		return () => window.clearTimeout(timeoutId);
	}, []);

	if (!isReady) {
		return <AppLoader />;
	}

	return (
		<BrowserRouter>
			<AppShell>
				<Suspense fallback={<AppLoader />}>
					<Routes>
						<Route path="/" element={<DashboardPage />} />
						<Route path="/globe" element={<GlobePage />} />
					</Routes>
				</Suspense>
			</AppShell>
		</BrowserRouter>
	);
}

export default App;
