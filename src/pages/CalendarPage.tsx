import { useMemo, useState } from 'react';
import { getUpcomingEvents } from '../lib/astro/celestialEvents';
import { useNotificationPreference } from '../hooks/useNotificationPreference';
import { useEventReminders } from '../hooks/useEventReminders';
import { NotificationToggle } from '../components/calendar/NotificationToggle';
import { EventTimeline } from '../components/calendar/EventTimeline';
import { NextEventCountdown } from '../components/calendar/NextEventCountdown';
import { CalendarViewSwitcher, type CalendarViewMode } from '../components/calendar/CalendarViewSwitcher';
import { CalendarGridView } from '../components/calendar/CalendarGridView';

export default function CalendarPage() {
	const events = useMemo(() => getUpcomingEvents(new Date()), []);
	const { enabled, support, enable, disable } = useNotificationPreference();
	useEventReminders(events, enabled);
	const [viewMode, setViewMode] = useState<CalendarViewMode>('liste');

	return (
		<div className="flex flex-col gap-5 pb-14">
			<div>
				<h2 className="text-xl font-semibold text-text">
					Calendrier & événements
				</h2>
				<p className="text-sm text-text-muted">
					Prochaines éclipses lunaires, éclipses solaires et super lunes —
					calculées localement.
				</p>
			</div>
			<CalendarViewSwitcher mode={viewMode} onChange={setViewMode} />
			{viewMode === 'liste' ? (
				<>
					<NextEventCountdown event={events[0]} />
					<EventTimeline events={events} />
				</>
			) : (
				<CalendarGridView />
			)}
			<NotificationToggle
				enabled={enabled}
				support={support}
				onEnable={enable}
				onDisable={disable}
			/>
		</div>
	);
}
