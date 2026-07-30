import { useCallback, useState } from 'react';

const STORAGE_KEY = 'moon-live:notifications-enabled';

export type NotificationSupport = 'unsupported' | 'granted' | 'denied' | 'default';

function readPreference(): boolean {
	if (typeof window === 'undefined') return false;
	return window.localStorage.getItem(STORAGE_KEY) === 'true';
}

function getSupportStatus(): NotificationSupport {
	if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
	return Notification.permission;
}

export function useNotificationPreference() {
	const [enabled, setEnabled] = useState<boolean>(readPreference);
	const [support, setSupport] = useState<NotificationSupport>(getSupportStatus);

	const enable = useCallback(async () => {
		if (support === 'unsupported') return;
		const permission = await Notification.requestPermission();
		setSupport(permission);
		if (permission === 'granted') {
			setEnabled(true);
			window.localStorage.setItem(STORAGE_KEY, 'true');
		}
	}, [support]);

	const disable = useCallback(() => {
		setEnabled(false);
		window.localStorage.setItem(STORAGE_KEY, 'false');
	}, []);

	return { enabled: enabled && support === 'granted', support, enable, disable };
}
