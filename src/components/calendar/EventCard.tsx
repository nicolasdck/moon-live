import { Link } from 'react-router-dom';
import { formatFullDate } from '../../lib/format';
import { EVENT_ICON, getEventTitleAndDetail } from '../../lib/astro/eventPresentation';
import type { CelestialEvent } from '../../types/events';

const DAY_MS = 86_400_000;

function getDaysUntil(date: Date): number {
	return Math.round((date.getTime() - Date.now()) / DAY_MS);
}

export function EventCard({ event }: { event: CelestialEvent }) {
	const { title, detail } = getEventTitleAndDetail(event);
	const Icon = EVENT_ICON[event.type];
	const daysUntil = getDaysUntil(event.date);
	const isEclipse = event.type === 'lunar-eclipse' || event.type === 'solar-eclipse';
	const isSupermoon = event.type === 'supermoon';

	return (
		<article className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-4">
			<div className="rounded-full bg-bg-elevated p-2 text-accent">
				<Icon size={20} />
			</div>
			<div className="flex-1">
				<div className="flex flex-wrap items-center justify-between gap-2">
					<h3 className="font-semibold text-text">{title}</h3>
					<span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-text-muted">
						{daysUntil <= 0 ? "aujourd'hui" : `dans ${daysUntil} j`}
					</span>
				</div>
				<p className="text-sm text-text-muted">{formatFullDate(event.date)}</p>
				<p className="mt-1 text-sm text-text-muted">{detail}</p>
				{isEclipse && (
					<Link
						to={`/eclipse?type=${event.type}&date=${encodeURIComponent(event.date.toISOString())}`}
						state={{ event }}
						className="mt-2 inline-block text-sm text-accent hover:underline"
					>
						Voir les circonstances locales
					</Link>
				)}
				{isSupermoon && (
					<Link
						to={`/lune-annee?annee=${event.date.getFullYear()}`}
						className="mt-2 inline-block text-sm text-accent hover:underline"
					>
						Voir les statistiques de l'année
					</Link>
				)}
			</div>
		</article>
	);
}
