import { Link } from 'react-router-dom';
import { ImageIcon, Video } from 'lucide-react';
import { useApod } from '../../hooks/useApod';
import { DashboardCard } from '../dashboard/DashboardCard';
import { ServiceErrorState } from '../shared/ServiceErrorState';

const EXCERPT_LENGTH = 120;

function excerpt(text: string): string {
	return text.length <= EXCERPT_LENGTH ? text : `${text.slice(0, EXCERPT_LENGTH).trimEnd()}…`;
}

export function ApodTeaserCard() {
	const { status, apod, error, refresh } = useApod();

	if (status === 'error' && !apod) {
		return (
			<DashboardCard title="Photo du jour (NASA)" icon={ImageIcon}>
				<ServiceErrorState
					compact
					message={error ?? 'Une erreur est survenue.'}
					onRetry={refresh}
					isRetrying={false}
				/>
			</DashboardCard>
		);
	}

	if (!apod) {
		return (
			<DashboardCard title="Photo du jour (NASA)" icon={ImageIcon}>
				<p className="text-sm text-text-muted">Chargement…</p>
			</DashboardCard>
		);
	}

	return (
		<DashboardCard title="Photo du jour (NASA)" icon={ImageIcon}>
			<Link to="/apod" className="block">
				<div className="mb-3 aspect-video w-full overflow-hidden rounded-xl bg-bg-elevated">
					{apod.media_type === 'image' ? (
						<img src={apod.url} alt={apod.title} className="h-full w-full object-cover" />
					) : (
						<div className="flex h-full w-full items-center justify-center text-text-muted">
							<Video size={28} />
						</div>
					)}
				</div>
				<p className="font-semibold text-text">{apod.title}</p>
				<p className="mt-1 text-sm text-text-muted">{excerpt(apod.explanation)}</p>
				<span className="mt-2 inline-block text-sm text-accent hover:underline">Lire la suite</span>
			</Link>
		</DashboardCard>
	);
}
