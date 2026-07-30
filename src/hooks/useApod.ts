import { useCallback, useEffect, useState } from 'react';
import type { ApodResponse } from '../lib/apod/types';

const CACHE_KEY = 'moon-live:apod-cache';

type ApodStatus = 'idle' | 'loading' | 'success' | 'error';

interface ApodState {
	status: ApodStatus;
	apod: ApodResponse | null;
	error: string | null;
}

function getTodayDateString(): string {
	return new Date().toISOString().slice(0, 10);
}

function readCache(): ApodResponse | null {
	try {
		const raw = window.localStorage.getItem(CACHE_KEY);
		return raw ? (JSON.parse(raw) as ApodResponse) : null;
	} catch {
		return null;
	}
}

function writeCache(apod: ApodResponse): void {
	try {
		window.localStorage.setItem(CACHE_KEY, JSON.stringify(apod));
	} catch {
		// localStorage unavailable — cache is a pure optimization, safe to skip.
	}
}

function getInitialState(): ApodState {
	const cached = readCache();
	if (cached && cached.date === getTodayDateString()) {
		return { status: 'success', apod: cached, error: null };
	}
	return { status: 'idle', apod: null, error: null };
}

export function useApod() {
	const [state, setState] = useState<ApodState>(getInitialState);

	const fetchApod = useCallback(async () => {
		setState((current) => ({ ...current, status: 'loading', error: null }));
		try {
			const response = await fetch('/api/apod');
			if (!response.ok) {
				const body = (await response.json().catch(() => null)) as { message?: string } | null;
				throw new Error(body?.message ?? `Le service a répondu avec le statut ${response.status}.`);
			}
			const apod = (await response.json()) as ApodResponse;
			writeCache(apod);
			setState({ status: 'success', apod, error: null });
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
		const isFresh = cached !== null && cached.date === getTodayDateString();
		if (!isFresh) {
			fetchApod();
		}
	}, [fetchApod]);

	return { ...state, refresh: fetchApod };
}
