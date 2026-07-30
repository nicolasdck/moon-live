import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MiniMoonPhaseIcon } from './MiniMoonPhaseIcon';
import {
	getDailyMoonPhases,
	getEventsInMonth,
	getMoonQuartersInMonth,
} from '../../lib/astro/monthlyMoonPhases';
import { getEventTitleAndDetail } from '../../lib/astro/eventPresentation';
import { formatFullDate } from '../../lib/format';

const WEEKDAY_LABELS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MONTH_FORMATTER = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' });

function isSameDay(a: Date, b: Date): boolean {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function getLeadingBlankCount(year: number, month: number): number {
	const firstDayIndex = new Date(year, month, 1).getDay();
	return (firstDayIndex + 6) % 7;
}

export function CalendarGridView() {
	const [viewedMonth, setViewedMonth] = useState(() => {
		const now = new Date();
		return new Date(now.getFullYear(), now.getMonth(), 1);
	});

	const year = viewedMonth.getFullYear();
	const month = viewedMonth.getMonth();
	const today = new Date();

	const dailyPhases = useMemo(() => getDailyMoonPhases(year, month), [year, month]);
	const quarters = useMemo(() => getMoonQuartersInMonth(year, month), [year, month]);
	const monthEvents = useMemo(() => getEventsInMonth(year, month), [year, month]);

	const leadingBlanks = getLeadingBlankCount(year, month);
	const trailingBlanks = (7 - ((leadingBlanks + dailyPhases.length) % 7)) % 7;

	function goToPreviousMonth() {
		setViewedMonth(new Date(year, month - 1, 1));
	}

	function goToNextMonth() {
		setViewedMonth(new Date(year, month + 1, 1));
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<button
					type="button"
					onClick={goToPreviousMonth}
					aria-label="Mois précédent"
					className="rounded-full border border-border p-2 text-text-muted transition-colors hover:text-text"
				>
					<ChevronLeft size={16} />
				</button>
				<h3 className="text-sm font-semibold capitalize text-text">{MONTH_FORMATTER.format(viewedMonth)}</h3>
				<button
					type="button"
					onClick={goToNextMonth}
					aria-label="Mois suivant"
					className="rounded-full border border-border p-2 text-text-muted transition-colors hover:text-text"
				>
					<ChevronRight size={16} />
				</button>
			</div>

			<div className="grid grid-cols-7 gap-1 text-center text-xs text-text-muted">
				{WEEKDAY_LABELS.map((label) => (
					<div key={label}>{label}</div>
				))}
			</div>

			<div className="grid grid-cols-7 gap-1">
				{Array.from({ length: leadingBlanks }, (_, index) => (
					<div key={`lead-${index}`} />
				))}
				{dailyPhases.map((day) => {
					const quarter = quarters.find((q) => isSameDay(q.date, day.date));
					const event = monthEvents.find((e) => isSameDay(e.date, day.date));
					const isToday = isSameDay(day.date, today);
					const titleParts = [
						formatFullDate(day.date),
						quarter?.label,
						event ? getEventTitleAndDetail(event).title : undefined,
					].filter(Boolean);

					return (
						<div
							key={day.date.toISOString()}
							title={titleParts.join(' — ')}
							className={`flex flex-col items-center gap-1 rounded-xl p-1.5 ${
								isToday ? 'bg-bg-elevated ring-1 ring-accent' : ''
							}`}
						>
							<MiniMoonPhaseIcon
								phaseAngleDeg={day.phaseAngleDeg}
								illuminationFraction={day.illuminationFraction}
							/>
							<span className="text-xs text-text-muted">{day.date.getDate()}</span>
							{(quarter || event) && (
								<span
									className={`h-1.5 w-1.5 rounded-full ${event ? 'bg-warn' : 'bg-accent'}`}
								/>
							)}
						</div>
					);
				})}
				{Array.from({ length: trailingBlanks }, (_, index) => (
					<div key={`trail-${index}`} />
				))}
			</div>

			{(quarters.length > 0 || monthEvents.length > 0) && (
				<div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 text-sm">
					{quarters.length > 0 && (
						<div>
							<p className="font-semibold text-text">Phases de ce mois</p>
							<ul className="mt-1 flex flex-col gap-0.5 text-text-muted">
								{quarters.map((quarter) => (
									<li key={quarter.date.toISOString()}>
										{quarter.label} — {formatFullDate(quarter.date)}
									</li>
								))}
							</ul>
						</div>
					)}
					{monthEvents.length > 0 && (
						<div>
							<p className="font-semibold text-text">Événements spéciaux</p>
							<ul className="mt-1 flex flex-col gap-0.5 text-text-muted">
								{monthEvents.map((event) => (
									<li key={event.id}>
										{getEventTitleAndDetail(event).title} — {formatFullDate(event.date)}
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
