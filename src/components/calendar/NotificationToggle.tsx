import { Bell, BellOff } from 'lucide-react';
import type { NotificationSupport } from '../../hooks/useNotificationPreference';

export function NotificationToggle({
	enabled,
	support,
	onEnable,
	onDisable,
}: {
	enabled: boolean;
	support: NotificationSupport;
	onEnable: () => void;
	onDisable: () => void;
}) {
	if (support === 'unsupported') {
		return;
	}

	return (
		<div className="rounded-2xl border border-border bg-surface p-4">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div className="flex items-center gap-2">
					{enabled ? (
						<Bell size={18} className="text-accent" />
					) : (
						<BellOff size={18} className="text-text-muted" />
					)}
					<span className="text-sm font-medium text-text">
						Rappels d'événements
					</span>
				</div>
				<button
					type="button"
					onClick={enabled ? onDisable : onEnable}
					className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-text transition-colors hover:border-accent"
				>
					{enabled ? 'Désactiver' : 'Activer'}
				</button>
			</div>
			{support === 'denied' && (
				<p className="mt-2 text-xs text-warn">
					Permission refusée — autorisez les notifications dans les paramètres
					du navigateur pour ce site.
				</p>
			)}
		</div>
	);
}
