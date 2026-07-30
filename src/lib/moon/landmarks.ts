export type LandmarkKind = 'crater' | 'apollo' | 'artemis-candidate';

export interface Landmark {
	kind: LandmarkKind;
	name: string;
	latitude: number;
	longitude: number;
	description: string;
	isApproximate?: boolean;
}

// Coordinates sourced from USGS Gazetteer of Planetary Nomenclature (craters)
// and NASA's Apollo Lunar Surface Journal / LRO-refined values (Apollo sites).
const CRATERS: readonly Landmark[] = [
	{
		kind: 'crater',
		name: 'Tycho',
		latitude: -43.31,
		longitude: -11.36,
		description: 'Cratère jeune (~108 M années) aux rayons d’éjecta spectaculaires, 85 km de diamètre.',
	},
	{
		kind: 'crater',
		name: 'Copernic',
		latitude: 9.62,
		longitude: -20.08,
		description: 'Grand cratère à pics centraux, 93 km de diamètre, référence de la stratigraphie lunaire.',
	},
	{
		kind: 'crater',
		name: 'Kepler',
		latitude: 8.1,
		longitude: -38.0,
		description: 'Cratère brillant de 31 km entouré d’un vaste système de rayons.',
	},
	{
		kind: 'crater',
		name: 'Aristarque',
		latitude: 23.7,
		longitude: -47.4,
		description: 'L’un des cratères les plus brillants de la Lune, 40 km de diamètre.',
	},
	{
		kind: 'crater',
		name: 'Platon',
		latitude: 51.6,
		longitude: -9.3,
		description: 'Grand cratère au fond de lave sombre et lisse, 101 km de diamètre.',
	},
	{
		kind: 'crater',
		name: 'Clavius',
		latitude: -58.62,
		longitude: -14.73,
		description: 'L’un des plus grands cratères visibles depuis la Terre, 230 km de diamètre.',
	},
	{
		kind: 'crater',
		name: 'Ératosthène',
		latitude: 14.47,
		longitude: -11.32,
		description: 'Cratère bien conservé de 59 km, à l’extrémité des Apennins lunaires.',
	},
	{
		kind: 'crater',
		name: 'Théophile',
		latitude: -11.4,
		longitude: 26.4,
		description: 'Cratère à pics centraux de 100 km, bordant la Mer de la Fécondité.',
	},
];

const APOLLO_SITES: readonly Landmark[] = [
	{
		kind: 'apollo',
		name: 'Apollo 11',
		latitude: 0.674,
		longitude: 23.473,
		description: 'Premier alunissage habité, 20 juillet 1969 — Mer de la Tranquillité.',
	},
	{
		kind: 'apollo',
		name: 'Apollo 12',
		latitude: -3.014,
		longitude: -23.419,
		description: 'Novembre 1969 — Océan des Tempêtes, à proximité de la sonde Surveyor 3.',
	},
	{
		kind: 'apollo',
		name: 'Apollo 14',
		latitude: -3.645,
		longitude: -17.471,
		description: 'Février 1971 — région de Fra Mauro.',
	},
	{
		kind: 'apollo',
		name: 'Apollo 15',
		latitude: 26.132,
		longitude: 3.634,
		description: 'Juillet 1971 — Hadley Rille, premier usage du rover lunaire.',
	},
	{
		kind: 'apollo',
		name: 'Apollo 16',
		latitude: -8.973,
		longitude: 15.499,
		description: 'Avril 1972 — plateau de Descartes, hautes-terres lunaires.',
	},
	{
		kind: 'apollo',
		name: 'Apollo 17',
		latitude: 20.188,
		longitude: 30.775,
		description: 'Décembre 1972 — vallée de Taurus-Littrow, dernière mission habitée.',
	},
];

// NASA has named 9 candidate regions near the lunar south pole for the first
// crewed landing since Apollo 17 (now targeted for Artemis IV, ~2028, after
// Artemis III was re-scoped to an Earth-orbit-only demonstration). These are
// named *regions*, not official point coordinates, so placement here is an
// illustrative cluster near the south pole — not a precise site.
const ARTEMIS_CANDIDATE_REGIONS: readonly Landmark[] = [
	{ name: 'Peak near Cabeus B', latitude: -85.3, longitude: -35 },
	{ name: 'Haworth', latitude: -87.4, longitude: -10 },
	{ name: 'Malapert Massif', latitude: -84.9, longitude: 5 },
	{ name: 'Mons Mouton Plateau', latitude: -85.3, longitude: -32 },
	{ name: 'Mons Mouton', latitude: -85.2, longitude: -30 },
	{ name: 'Nobile Rim 1', latitude: -85.4, longitude: 50 },
	{ name: 'Nobile Rim 2', latitude: -85.5, longitude: 55 },
	{ name: 'de Gerlache Rim 2', latitude: -88.1, longitude: -75 },
	{ name: 'Slater Plain', latitude: -86.0, longitude: 20 },
].map((region) => ({
	kind: 'artemis-candidate' as const,
	name: region.name,
	latitude: region.latitude,
	longitude: region.longitude,
	isApproximate: true,
	description:
		'Région candidate pour le premier alunissage habité depuis Apollo 17 (visé par Artemis IV, ~2028) — position approximative, aucune coordonnée ponctuelle officielle publiée.',
}));

export const LANDMARKS: readonly Landmark[] = [
	...CRATERS,
	...APOLLO_SITES,
	...ARTEMIS_CANDIDATE_REGIONS,
];
