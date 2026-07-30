import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>;
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function isStandalone(): boolean {
	return (
		window.matchMedia('(display-mode: standalone)').matches ||
		(window.navigator as Navigator & { standalone?: boolean }).standalone === true
	);
}

export function useInstallPrompt() {
	const [deferredEvent, setDeferredEvent] = useState<BeforeInstallPromptEvent | null>(null);
	const [installed, setInstalled] = useState(isStandalone);

	useEffect(() => {
		const handleBeforeInstallPrompt = (event: Event) => {
			event.preventDefault();
			setDeferredEvent(event as BeforeInstallPromptEvent);
		};
		const handleAppInstalled = () => {
			setInstalled(true);
			setDeferredEvent(null);
		};

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
		window.addEventListener('appinstalled', handleAppInstalled);

		return () => {
			window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
			window.removeEventListener('appinstalled', handleAppInstalled);
		};
	}, []);

	const promptInstall = async () => {
		if (!deferredEvent) return;
		await deferredEvent.prompt();
		const choice = await deferredEvent.userChoice;
		if (choice.outcome === 'accepted') {
			setInstalled(true);
		}
		setDeferredEvent(null);
	};

	return {
		canInstall: Boolean(deferredEvent) && !installed,
		isInstalled: installed,
		promptInstall,
	};
}
