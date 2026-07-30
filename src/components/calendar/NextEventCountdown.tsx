import { useCountdown } from '../../hooks/useCountdown';
import { formatFullDate } from '../../lib/format';
import { EVENT_ICON, getEventTitleAndDetail } from '../../lib/astro/eventPresentation';
import type { CelestialEvent } from '../../types/events';

function TimeUnit({ value, label }: { value: number; label: string }) {
	return (
		<div className="flex flex-col items-center">
			<span className="text-3xl font-bold text-accent-strong tabular-nums">
				{value.toString().padStart(2, '0')}
			</span>
			<span className="text-xs text-text-muted uppercase tracking-wide">{label}</span>
		</div>
	);
}

export function NextEventCountdown({ event }: { event: CelestialEvent | undefined }) {
	const countdown = useCountdown(event?.date ?? null);

	if (!event || !countdown) return null;

	const { title } = getEventTitleAndDetail(event);
	const Icon = EVENT_ICON[event.type];

	return (
		<div className="rounded-2xl border border-border bg-surface p-5">
			<div className="mb-4 flex items-center gap-2 text-text-muted">
				<Icon size={16} />
				<h2 className="text-xs font-semibold tracking-[0.2em] uppercase">Prochain événement</h2>
			</div>
			<p className="mb-1 text-lg font-semibold text-text">{title}</p>
			<p className="mb-4 text-sm text-text-muted">{formatFullDate(event.date)}</p>
			<div className="flex gap-6">
				<TimeUnit value={countdown.days} label="jours" />
				<TimeUnit value={countdown.hours} label="heures" />
				<TimeUnit value={countdown.minutes} label="min" />
				<TimeUnit value={countdown.seconds} label="sec" />
			</div>
		</div>
	);
}
