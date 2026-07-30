import { useState } from 'react';
import { Download, X } from 'lucide-react';
import { useInstallPrompt } from '../../hooks/useInstallPrompt';

const DISMISS_KEY = 'moon-live:install-banner-dismissed';

function readDismissed(): boolean {
	try {
		return window.sessionStorage.getItem(DISMISS_KEY) === 'true';
	} catch {
		return false;
	}
}

export function InstallBanner() {
	const { canInstall, promptInstall } = useInstallPrompt();
	const [dismissed, setDismissed] = useState(readDismissed);

	if (!canInstall || dismissed) return null;

	const dismiss = () => {
		try {
			window.sessionStorage.setItem(DISMISS_KEY, 'true');
		} catch {
			// sessionStorage unavailable — dismissal just won't persist across reloads.
		}
		setDismissed(true);
	};

	return (
		<div className="mx-auto flex w-full max-w-md items-center gap-4 rounded-2xl border border-border bg-surface px-4 py-3 shadow-2xl">
			<img src="/pwa-64x64.png" alt="" className="h-11 w-11 shrink-0 rounded-xl" />
			<div className="min-w-0 flex-1">
				<p className="text-sm font-semibold text-text">Installer Moon Live</p>
				<p className="truncate text-xs text-text-muted">
					Accès rapide depuis l'écran d'accueil, suivi hors-ligne.
				</p>
			</div>
			<button
				type="button"
				onClick={promptInstall}
				className="flex shrink-0 items-center gap-2 rounded-full bg-accent px-3 py-2 text-sm font-medium text-bg hover:brightness-110"
			>
				<Download size={16} />
				Installer
			</button>
			<button
				type="button"
				onClick={dismiss}
				aria-label="Fermer"
				className="shrink-0 text-text-muted hover:text-text"
			>
				<X size={16} />
			</button>
		</div>
	);
}
