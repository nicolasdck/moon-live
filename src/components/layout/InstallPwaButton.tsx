import { Download } from 'lucide-react';
import { useInstallPrompt } from '../../hooks/useInstallPrompt';

export function InstallPwaButton() {
	const { canInstall, promptInstall } = useInstallPrompt();

	if (!canInstall) return null;

	return (
		<button
			type="button"
			onClick={promptInstall}
			className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent-strong"
		>
			<Download size={16} />
			Installer l'app
		</button>
	);
}
