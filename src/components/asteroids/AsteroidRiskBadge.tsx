import type { RiskLevel } from '../../lib/asteroids/types';

const RISK_STYLES: Record<RiskLevel, string> = {
	faible: 'bg-surface text-text-muted border-border',
	modéré: 'bg-warn/15 text-warn border-warn/40',
	élevé: 'bg-danger/15 text-danger border-danger/40',
};

export function AsteroidRiskBadge({ level }: { level: RiskLevel }) {
	return (
		<span
			title="Niveau indicatif combinant la classification NASA (objet potentiellement dangereux) et la distance de survol cette semaine — ne remplace pas une évaluation scientifique du risque d'impact (voir JPL Sentry)."
			className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${RISK_STYLES[level]}`}
		>
			Risque {level}
		</span>
	);
}
