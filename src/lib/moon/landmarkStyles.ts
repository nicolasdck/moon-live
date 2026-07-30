import type { LandmarkKind } from './landmarks';

export interface LandmarkKindMeta {
	color: string;
	label: string;
}

// Colors are chosen to stay visually distinct from each other on the globe.
export const LANDMARK_KIND_META: Record<LandmarkKind, LandmarkKindMeta> = {
	crater: { color: '#9ca3af', label: 'Cratère' },
	apollo: { color: '#f2c94c', label: 'Site Apollo' },
	'artemis-candidate': { color: '#ff8a4c', label: 'Région candidate Artemis IV' },
	mare: { color: '#22d3ee', label: 'Mer / baie / lac' },
	montes: { color: '#a8763e', label: 'Chaîne de montagnes' },
	valles: { color: '#4ade80', label: 'Vallée / rainure' },
};

export const ALL_LANDMARK_KINDS: readonly LandmarkKind[] = [
	'crater',
	'apollo',
	'artemis-candidate',
	'mare',
	'montes',
	'valles',
];
