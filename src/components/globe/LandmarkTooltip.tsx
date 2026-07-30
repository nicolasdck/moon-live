import { X } from 'lucide-react';
import { useApolloImages } from '../../hooks/useApolloImages';
import type { Landmark } from '../../lib/moon/landmarks';

export function LandmarkTooltip({
	landmark,
	onClose,
}: {
	landmark: Landmark;
	onClose: () => void;
}) {
	const photos = useApolloImages(
		landmark.kind === 'apollo' ? landmark.name : '',
	);

	return (
		<div className="pointer-events-auto relative w-48 max-w-[70vw] -translate-y-[calc(100%+14px)] rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text shadow-xl">
			<button
				type="button"
				onClick={(event) => {
					event.stopPropagation();
					onClose();
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
			{landmark.kind === 'apollo' && photos.length > 0 && (
				<div className="mt-2 border-t border-border pt-2">
					<div className="flex gap-1.5">
						{photos.map((photo) => (
							<a
								key={photo.nasaId}
								href={photo.fullUrl}
								target="_blank"
								rel="noreferrer"
								onClick={(event) => event.stopPropagation()}
								title={photo.title}
							>
								<img
									src={photo.thumbnailUrl}
									alt={photo.title}
									className="h-20 rounded"
								/>
							</a>
						))}
					</div>
					<p className="mt-1 text-[10px] text-text-muted">
						Photos : NASA Images
					</p>
				</div>
			)}
		</div>
	);
}
