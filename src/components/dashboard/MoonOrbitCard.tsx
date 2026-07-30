import { Orbit } from 'lucide-react';
import { DashboardCard } from './DashboardCard';
import { formatNumber } from '../../lib/format';
import type { MoonSnapshot } from '../../types/moon';

export function MoonOrbitCard({ snapshot }: { snapshot: MoonSnapshot }) {
	return (
		<DashboardCard title="Orbite & libration" icon={Orbit}>
			<dl className="grid grid-cols-2 gap-4 text-sm">
				<div>
					<dt className="text-text-muted">Vitesse orbitale</dt>
					<dd className="text-xl font-semibold text-text">
						{formatNumber(snapshot.orbitalSpeedKmS, 2)} km/s
					</dd>
				</div>
				<div>
					<dt className="text-text-muted">Diamètre apparent</dt>
					<dd className="text-xl font-semibold text-text">
						{formatNumber(snapshot.apparentDiameterDeg, 3)}°
					</dd>
				</div>
				<div>
					<dt className="text-text-muted">Libration (latitude)</dt>
					<dd className="font-medium text-text">
						{formatNumber(snapshot.libration.latitudeDeg, 2)}°
					</dd>
				</div>
				<div>
					<dt className="text-text-muted">Libration (longitude)</dt>
					<dd className="font-medium text-text">
						{formatNumber(snapshot.libration.longitudeDeg, 2)}°
					</dd>
				</div>
			</dl>
		</DashboardCard>
	);
}
