import { useEffect, useMemo, useReducer } from 'react';
import { computeMoonSnapshot } from '../lib/astro/moonCalculations';
import type { Coordinates, MoonSnapshot } from '../types/moon';

const REFRESH_INTERVAL_MS = 30_000;

export function useMoonData(coordinates: Coordinates): MoonSnapshot {
	const [tick, forceTick] = useReducer((count: number) => count + 1, 0);

	useEffect(() => {
		const intervalId = window.setInterval(forceTick, REFRESH_INTERVAL_MS);
		return () => window.clearInterval(intervalId);
	}, []);

	return useMemo(
		() => computeMoonSnapshot(new Date(), coordinates),
		// eslint-disable-next-line react-hooks/exhaustive-deps -- `tick` forces periodic recomputation of `new Date()`
		[coordinates, tick],
	);
}
