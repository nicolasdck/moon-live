import { useMemo } from 'react';
import { getUpcomingEvents } from '../lib/astro/celestialEvents';
import { useNotificationPreference } from '../hooks/useNotificationPreference';
import { useEventReminders } from '../hooks/useEventReminders';
import { NotificationToggle } from '../components/calendar/NotificationToggle';
import { EventTimeline } from '../components/calendar/EventTimeline';
import { NextEventCountdown } from '../components/calendar/NextEventCountdown';

export default function CalendarPage() {
	const events = useMemo(() => getUpcomingEvents(new Date()), []);
	const { enabled, support, enable, disable } = useNotificationPreference();
	useEventReminders(events, enabled);

	return (
		<div className="flex flex-col gap-5">
			<div>
				<h2 className="text-xl font-semibold text-text">
					Calendrier & événements
				</h2>
				<p className="text-sm text-text-muted">
					Prochaines éclipses lunaires, éclipses solaires et super lunes —
					calculées localement.
				</p>
			</div>
			<NotificationToggle
				enabled={enabled}
				support={support}
				onEnable={enable}
				onDisable={disable}
			/>
			<NextEventCountdown event={events[0]} />
			<EventTimeline events={events} />
		</div>
	);
}
