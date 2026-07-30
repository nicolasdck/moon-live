import { formatTime } from '../../lib/format';
import type { EclipseLocalPhase } from '../../lib/astro/eclipseLocalCircumstances';

export function EclipseProgramList({ phases }: { phases: EclipseLocalPhase[] }) {
	return (
		<div className="flex flex-col gap-2">
			{phases.map((phase) => (
				<div
					key={phase.label}
					className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface p-3 text-sm"
				>
					<div>
						<p className="font-medium text-text">{phase.label}</p>
						<p className="text-xs text-text-muted">
							Alt. {phase.altitudeDeg.toFixed(1)}° · Az. {phase.azimuthDeg.toFixed(0)}°
							{phase.altitudeDeg < 0 && <span className="ml-2 text-warn">sous l'horizon</span>}
						</p>
					</div>
					<span className="font-semibold text-text">{formatTime(phase.time)}</span>
				</div>
			))}
		</div>
	);
}
