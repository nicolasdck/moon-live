import { Moon } from 'lucide-react';
import { DashboardCard } from './DashboardCard';
import { MoonPhaseVisual } from './MoonPhaseVisual';
import { getPhaseName } from '../../lib/astro/phaseName';
import { formatNumber, formatPercent } from '../../lib/format';
import type { MoonSnapshot } from '../../types/moon';

export function MoonPhaseCard({ snapshot }: { snapshot: MoonSnapshot }) {
	return (
		<DashboardCard title="Phase lunaire" icon={Moon}>
			<div className="flex items-center gap-5">
				<MoonPhaseVisual
					phaseAngleDeg={snapshot.phaseAngleDeg}
					illuminationFraction={snapshot.illuminationFraction}
				/>
				<div className="space-y-1">
					<p className="text-lg font-semibold text-text">{getPhaseName(snapshot.phaseAngleDeg)}</p>
					<p className="text-3xl font-bold text-accent-strong">
						{formatPercent(snapshot.illuminationFraction)}
					</p>
					<p className="text-sm text-text-muted">illumination visible</p>
					<p className="text-sm text-text-muted">
						Âge : {formatNumber(snapshot.ageDays, 1)} jours
					</p>
				</div>
			</div>
		</DashboardCard>
	);
}
