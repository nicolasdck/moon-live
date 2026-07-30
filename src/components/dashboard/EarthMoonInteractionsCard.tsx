import { Waves } from 'lucide-react';
import { DashboardCard } from './DashboardCard';
import { formatPercent } from '../../lib/format';
import type { MoonSnapshot } from '../../types/moon';

const TIDAL_RANGE_LABEL: Record<MoonSnapshot['tidalRange'], string> = {
	spring: 'Marées de vive-eau (forte amplitude)',
	neap: 'Marées de morte-eau (faible amplitude)',
	intermediate: 'Amplitude de marée intermédiaire',
};

export function EarthMoonInteractionsCard({ snapshot }: { snapshot: MoonSnapshot }) {
	const gravityDeltaFraction = snapshot.gravityRelativeToAverage - 1;

	return (
		<DashboardCard title="Interactions Terre-Lune" icon={Waves}>
			<div className="space-y-4 text-sm">
				<div>
					<p className="font-medium text-text">{TIDAL_RANGE_LABEL[snapshot.tidalRange]}</p>
					<p className="text-text-muted">
						Estimation basée sur la phase actuelle (proximité d'une syzygie ou d'une quadrature) —
						une indication pédagogique, pas une prédiction de marée par port.
					</p>
				</div>
				<div>
					<p className="font-medium text-text">
						Attraction gravitationnelle : {gravityDeltaFraction >= 0 ? '+' : ''}
						{formatPercent(gravityDeltaFraction)} vs moyenne
					</p>
					<p className="text-text-muted">
						Calculée à partir de la distance réelle actuelle (loi en 1/d²).
					</p>
				</div>
				<div className="grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
					<p className="text-text-muted">
						<span className="font-medium text-text">Magnétosphère.</span> La Lune traverse
						périodiquement la magnétotail terrestre, la protégeant partiellement du vent solaire
						direct.
					</p>
					<p className="text-text-muted">
						<span className="font-medium text-text">Poussière lunaire.</span> Chargée
						électrostatiquement par le rayonnement UV, elle peut léviter localement près du
						terminateur jour/nuit.
					</p>
				</div>
			</div>
		</DashboardCard>
	);
}
