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
		return null;
	}

	return (
		<div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/70 px-4 py-2 backdrop-blur-sm">
			<div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 text-xs">
				<div className="flex items-center gap-2 text-text-muted">
					{enabled ? <Bell size={14} className="text-accent" /> : <BellOff size={14} />}
					<span>Rappels d'événements</span>
					{support === 'denied' && (
						<span className="text-warn" title="Autorisez les notifications dans les paramètres du navigateur pour ce site.">
							— permission refusée
						</span>
					)}
				</div>
				<button
					type="button"
					onClick={enabled ? onDisable : onEnable}
					className="rounded-full border border-border px-3 py-1 font-medium text-text transition-colors hover:border-accent"
				>
					{enabled ? 'Désactiver' : 'Activer'}
				</button>
			</div>
		</div>
	);
}
