import { useEffect, useState } from 'react';

export interface CountdownParts {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

export function useCountdown(target: Date | null): CountdownParts | null {
	const [now, setNow] = useState(() => Date.now());

	useEffect(() => {
		if (!target) return;
		const intervalId = window.setInterval(() => setNow(Date.now()), 1000);
		return () => window.clearInterval(intervalId);
	}, [target]);

	if (!target) return null;

	const remainingMs = Math.max(0, target.getTime() - now);

	return {
		days: Math.floor(remainingMs / 86_400_000),
		hours: Math.floor((remainingMs % 86_400_000) / 3_600_000),
		minutes: Math.floor((remainingMs % 3_600_000) / 60_000),
		seconds: Math.floor((remainingMs % 60_000) / 1000),
	};
}
