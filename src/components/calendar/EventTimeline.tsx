import { EventCard } from './EventCard';
import type { CelestialEvent } from '../../types/events';

export function EventTimeline({ events }: { events: CelestialEvent[] }) {
	if (events.length === 0) {
		return <p className="text-sm text-text-muted">Aucun événement à venir dans la période calculée.</p>;
	}

	return (
		<div className="flex flex-col gap-3">
			{events.map((event) => (
				<EventCard key={event.id} event={event} />
			))}
		</div>
	);
}
