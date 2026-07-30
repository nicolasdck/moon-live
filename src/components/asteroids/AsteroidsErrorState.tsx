import { AlertTriangle, RefreshCw } from 'lucide-react';

export function AsteroidsErrorState({
	message,
	onRetry,
	isRetrying,
}: {
	message: string;
	onRetry: () => void;
	isRetrying: boolean;
}) {
	return (
		<div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-8 text-center">
			<AlertTriangle size={32} className="text-warn" />
			<div>
				<p className="font-semibold text-text">Service NASA temporairement indisponible</p>
				<p className="mt-1 text-sm text-text-muted">{message}</p>
			</div>
			<button
				type="button"
				onClick={onRetry}
				disabled={isRetrying}
				className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-bg hover:brightness-110 disabled:opacity-50"
			>
				<RefreshCw size={14} className={isRetrying ? 'animate-spin' : ''} />
				Réessayer
			</button>
		</div>
	);
}
