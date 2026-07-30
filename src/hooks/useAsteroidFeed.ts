import { useCallback, useEffect, useState } from 'react';
import { normalizeNeoFeed } from '../lib/asteroids/normalize';
import { NEO_CACHE_KEY, NEO_CACHE_TTL_MS } from '../lib/asteroids/constants';
import type { NeoFeedResponse, NormalizedAsteroid } from '../lib/asteroids/types';

type FeedStatus = 'idle' | 'loading' | 'success' | 'error';

interface AsteroidFeedState {
	status: FeedStatus;
	asteroids: NormalizedAsteroid[];
	error: string | null;
	lastFetchedAt: Date | null;
}

interface Cache {
	asteroids: NormalizedAsteroid[];
	fetchedAt: number;
}

function readCache(): Cache | null {
	try {
		const raw = window.localStorage.getItem(NEO_CACHE_KEY);
		return raw ? (JSON.parse(raw) as Cache) : null;
	} catch {
		return null;
	}
}

function writeCache(cache: Cache): void {
	try {
		window.localStorage.setItem(NEO_CACHE_KEY, JSON.stringify(cache));
	} catch {
		// localStorage unavailable (private browsing, quota) — cache is a pure optimization, safe to skip.
	}
}

function getInitialState(): AsteroidFeedState {
	const cached = readCache();
	if (cached) {
		return {
			status: 'success',
			asteroids: cached.asteroids,
			error: null,
			lastFetchedAt: new Date(cached.fetchedAt),
		};
	}
	return { status: 'idle', asteroids: [], error: null, lastFetchedAt: null };
}

export function useAsteroidFeed() {
	const [state, setState] = useState<AsteroidFeedState>(getInitialState);

	const fetchFeed = useCallback(async () => {
		setState((current) => ({ ...current, status: 'loading', error: null }));
		try {
			const response = await fetch('/api/neo');
			if (!response.ok) {
				const body = (await response.json().catch(() => null)) as { message?: string } | null;
				throw new Error(body?.message ?? `Le service a répondu avec le statut ${response.status}.`);
			}
			const feed = (await response.json()) as NeoFeedResponse;
			const asteroids = normalizeNeoFeed(feed);
			const fetchedAt = Date.now();
			writeCache({ asteroids, fetchedAt });
			setState({ status: 'success', asteroids, error: null, lastFetchedAt: new Date(fetchedAt) });
		} catch (error) {
			setState((current) => ({
				...current,
				status: 'error',
				error: error instanceof Error ? error.message : 'Erreur inconnue.',
			}));
		}
	}, []);

	useEffect(() => {
		const cached = readCache();
		const isFresh = cached !== null && Date.now() - cached.fetchedAt < NEO_CACHE_TTL_MS;
		if (!isFresh) {
			fetchFeed();
		}
	}, [fetchFeed]);

	return { ...state, refresh: fetchFeed };
}
