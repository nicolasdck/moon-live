import { useEffect } from 'react';
import { NOTIFICATION_WINDOW_HOURS } from '../lib/astro/constants';
import type { CelestialEvent } from '../types/events';

const NOTIFIED_STORAGE_KEY = 'moon-live:notified-events';

function readNotifiedIds(): Set<string> {
	try {
		const raw = window.localStorage.getItem(NOTIFIED_STORAGE_KEY);
		return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
	} catch {
		return new Set();
	}
}

function writeNotifiedIds(ids: Set<string>): void {
	try {
		window.localStorage.setItem(NOTIFIED_STORAGE_KEY, JSON.stringify([...ids]));
	} catch {
		// localStorage unavailable — dedupe is a pure optimization, safe to skip.
	}
}

function describeEvent(event: CelestialEvent): string {
	switch (event.type) {
		case 'lunar-eclipse':
			return `Éclipse lunaire ${event.kind} à venir`;
		case 'solar-eclipse':
			return `Éclipse solaire ${event.kind} à venir`;
		case 'supermoon':
			return 'Super lune à venir';
	}
}

export function useEventReminders(events: CelestialEvent[], enabled: boolean) {
	useEffect(() => {
		if (!enabled || !('serviceWorker' in navigator)) return;

		const windowMs = NOTIFICATION_WINDOW_HOURS * 60 * 60 * 1000;
		const now = Date.now();
		const upcoming = events.filter((event) => {
			const delta = event.date.getTime() - now;
			return delta >= 0 && delta <= windowMs;
		});
		if (upcoming.length === 0) return;

		const notifiedIds = readNotifiedIds();
		const toNotify = upcoming.filter((event) => !notifiedIds.has(event.id));
		if (toNotify.length === 0) return;

		navigator.serviceWorker.ready.then((registration) => {
			for (const event of toNotify) {
				registration.showNotification('Moon Live', {
					body: describeEvent(event),
					icon: '/pwa-192x192.png',
					tag: event.id,
				});
				notifiedIds.add(event.id);
			}
			writeNotifiedIds(notifiedIds);
		});
	}, [events, enabled]);
}
