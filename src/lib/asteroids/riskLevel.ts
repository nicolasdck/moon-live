import { RISK_HIGH_MAX_LUNAR_DISTANCE, RISK_MODERATE_MAX_LUNAR_DISTANCE } from './constants';
import type { RiskLevel } from './types';

/**
 * Illustrative/educational risk tier only — combines NASA's official
 * "potentially hazardous" classification with this week's flyby distance.
 * This is NOT a scientific impact-risk assessment (see JPL's Sentry system
 * for that); it's meant to help a general audience triage a weekly list.
 */
export function getRiskLevel(isPotentiallyHazardous: boolean, missDistanceLunar: number): RiskLevel {
	if (isPotentiallyHazardous && missDistanceLunar < RISK_HIGH_MAX_LUNAR_DISTANCE) {
		return 'élevé';
	}
	if (isPotentiallyHazardous || missDistanceLunar < RISK_MODERATE_MAX_LUNAR_DISTANCE) {
		return 'modéré';
	}
	return 'faible';
}
