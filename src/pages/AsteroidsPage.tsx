import { useAsteroidFeed } from '../hooks/useAsteroidFeed';
import { AsteroidsSummary } from '../components/asteroids/AsteroidsSummary';
import { AsteroidCard } from '../components/asteroids/AsteroidCard';
import { ServiceErrorState } from '../components/shared/ServiceErrorState';

export default function AsteroidsPage() {
	const { status, asteroids, error, lastFetchedAt, refresh } = useAsteroidFeed();
	const isRefreshing = status === 'loading';

	if (status === 'error' && asteroids.length === 0) {
		return (
			<ServiceErrorState
				message={error ?? 'Une erreur est survenue.'}
				onRetry={refresh}
				isRetrying={isRefreshing}
			/>
		);
	}

	return (
		<div className="flex flex-col gap-5">
			<AsteroidsSummary
				asteroids={asteroids}
				lastFetchedAt={lastFetchedAt}
				isRefreshing={isRefreshing}
				onRefresh={refresh}
			/>
			{status === 'loading' && asteroids.length === 0 ? (
				<p className="text-center text-sm text-text-muted">Chargement des données NASA…</p>
			) : (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{asteroids.map((asteroid) => (
						<AsteroidCard key={asteroid.id} asteroid={asteroid} />
					))}
				</div>
			)}
		</div>
	);
}
