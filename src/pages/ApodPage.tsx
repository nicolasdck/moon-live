import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useApod } from '../hooks/useApod';
import { ServiceErrorState } from '../components/shared/ServiceErrorState';
import { formatFullDate } from '../lib/format';

export default function ApodPage() {
	const { status, apod, error, refresh } = useApod();
	const isRefreshing = status === 'loading';
	const [imageLoaded, setImageLoaded] = useState(false);

	return (
		<div className="flex flex-col gap-5">
			<Link to="/" className="flex w-fit items-center gap-2 text-sm text-text-muted hover:text-text">
				<ArrowLeft size={16} />
				Retour au dashboard
			</Link>

			{status === 'error' && !apod ? (
				<ServiceErrorState
					message={error ?? 'Une erreur est survenue.'}
					onRetry={refresh}
					isRetrying={isRefreshing}
				/>
			) : !apod ? (
				<p className="text-center text-sm text-text-muted">Chargement…</p>
			) : (
				<article className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6">
					<div className="overflow-hidden rounded-xl bg-bg-elevated">
						{apod.media_type === 'image' ? (
							<>
								{!imageLoaded && <div className="aspect-video w-full animate-pulse" />}
								<img
									src={apod.hdurl ?? apod.url}
									alt={apod.title}
									onLoad={() => setImageLoaded(true)}
									className={`w-full ${imageLoaded ? 'block' : 'hidden'}`}
								/>
							</>
						) : (
							<iframe
								src={apod.url}
								title={apod.title}
								className="aspect-video w-full"
								allowFullScreen
							/>
						)}
					</div>
					<div>
						<h1 className="text-xl font-semibold text-text">{apod.title}</h1>
						<p className="text-sm text-text-muted">
							{formatFullDate(new Date(apod.date))}
							{apod.copyright ? ` · © ${apod.copyright.replace(/\n/g, ' ').trim()}` : ' · Domaine public'}
						</p>
					</div>
					<p className="whitespace-pre-line text-sm text-text-muted">{apod.explanation}</p>
				</article>
			)}
		</div>
	);
}
