import { AlertTriangle, RefreshCw } from 'lucide-react';

export function ServiceErrorState({
	title = 'Service NASA temporairement indisponible',
	message,
	onRetry,
	isRetrying,
	compact = false,
}: {
	title?: string;
	message: string;
	onRetry: () => void;
	isRetrying: boolean;
	compact?: boolean;
}) {
	return (
		<div
			className={`flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface text-center ${
				compact ? 'p-5' : 'p-8'
			}`}
		>
			<AlertTriangle size={compact ? 24 : 32} className="text-warn" />
			<div>
				<p className="font-semibold text-text">{title}</p>
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
