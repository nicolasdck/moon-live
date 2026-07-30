import { useEffect, useState } from 'react';
import { DEFAULT_OBSERVER_LOCATION } from '../lib/astro/constants';
import type { Coordinates } from '../types/moon';

export type GeolocationStatus = 'idle' | 'locating' | 'granted' | 'denied' | 'unsupported';

export interface GeolocationState {
	status: GeolocationStatus;
	coordinates: Coordinates;
	isFallback: boolean;
}

function isGeolocationSupported(): boolean {
	return typeof navigator !== 'undefined' && 'geolocation' in navigator;
}

function getInitialState(): GeolocationState {
	return {
		status: isGeolocationSupported() ? 'locating' : 'unsupported',
		coordinates: DEFAULT_OBSERVER_LOCATION,
		isFallback: true,
	};
}

export function useGeolocation(): GeolocationState {
	const [state, setState] = useState<GeolocationState>(getInitialState);

	useEffect(() => {
		if (!isGeolocationSupported()) return;

		const watchId = navigator.geolocation.watchPosition(
			(position) => {
				setState({
					status: 'granted',
					isFallback: false,
					coordinates: {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					},
				});
			},
			() => {
				setState({
					status: 'denied',
					isFallback: true,
					coordinates: DEFAULT_OBSERVER_LOCATION,
				});
			},
			{ enableHighAccuracy: false, maximumAge: 5 * 60 * 1000, timeout: 10_000 },
		);

		return () => navigator.geolocation.clearWatch(watchId);
	}, []);

	return state;
}
