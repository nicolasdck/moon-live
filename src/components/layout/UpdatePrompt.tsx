import { RefreshCw, WifiOff, X } from 'lucide-react';
import { usePwaUpdate } from '../../hooks/usePwaUpdate';

export function UpdatePrompt() {
	const { needRefresh, offlineReady, updateServiceWorker, dismiss } = usePwaUpdate();

	if (!needRefresh && !offlineReady) return null;

	return (
		<div className="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-fit max-w-[calc(100%-2rem)] items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-text shadow-2xl">
			{needRefresh ? (
				<>
					<RefreshCw size={18} className="shrink-0 text-accent" />
					<span>Nouvelle version disponible.</span>
					<button
						type="button"
						onClick={() => updateServiceWorker(true)}
						className="rounded-full bg-accent px-3 py-1 font-medium text-bg hover:brightness-110"
					>
						Rafraîchir
					</button>
				</>
			) : (
				<>
					<WifiOff size={18} className="shrink-0 text-accent" />
					<span>Moon Live est prêt pour une utilisation hors-ligne.</span>
				</>
			)}
			<button
				type="button"
				onClick={dismiss}
				aria-label="Fermer"
				className="text-text-muted hover:text-text"
			>
				<X size={16} />
			</button>
		</div>
	);
}
