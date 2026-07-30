export type CalendarViewMode = 'liste' | 'grille';

const VIEWS: { mode: CalendarViewMode; label: string }[] = [
	{ mode: 'liste', label: 'Liste' },
	{ mode: 'grille', label: 'Grille' },
];

export function CalendarViewSwitcher({
	mode,
	onChange,
}: {
	mode: CalendarViewMode;
	onChange: (mode: CalendarViewMode) => void;
}) {
	return (
		<div className="flex w-fit gap-1 rounded-full border border-border bg-bg-elevated p-1">
			{VIEWS.map((view) => (
				<button
					key={view.mode}
					type="button"
					onClick={() => onChange(view.mode)}
					className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
						mode === view.mode
							? 'bg-surface text-accent-strong'
							: 'text-text-muted hover:text-text'
					}`}
				>
					{view.label}
				</button>
			))}
		</div>
	);
}
