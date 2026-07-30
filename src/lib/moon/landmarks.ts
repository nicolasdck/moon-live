export type LandmarkKind = 'crater' | 'apollo' | 'artemis-candidate' | 'mare' | 'montes' | 'valles';

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

// Mers/baies/lacs lunaires — coordonnées USGS Gazetteer of Planetary Nomenclature.
const MARE_FEATURES: readonly Landmark[] = [
	{
		kind: 'mare',
		name: 'Mare Imbrium',
		latitude: 34.72,
		longitude: -14.91,
		description:
			'Plus grand bassin de lave de la face visible (1145 km), bordé par les Montes Apenninus et Alpes.',
	},
	{
		kind: 'mare',
		name: 'Mare Serenitatis',
		latitude: 27.29,
		longitude: 18.36,
		description: 'Vaste bassin circulaire basaltique (674 km), à l’est de Mare Imbrium.',
	},
	{
		kind: 'mare',
		name: 'Mare Tranquillitatis',
		latitude: 8.35,
		longitude: 30.83,
		description: 'Mer de la Tranquillité (876 km) — site du premier alunissage habité, Apollo 11.',
	},
	{
		kind: 'mare',
		name: 'Mare Crisium',
		latitude: 16.18,
		longitude: 59.1,
		description: 'Bassin ovale isolé (556 km) près du limbe est, bien visible même aux jumelles.',
	},
	{
		kind: 'mare',
		name: 'Mare Fecunditatis',
		latitude: -7.83,
		longitude: 53.67,
		description: 'Mer de la Fécondité (840 km), site des sondes soviétiques Luna 16 et Luna 20.',
	},
	{
		kind: 'mare',
		name: 'Mare Nectaris',
		latitude: -15.19,
		longitude: 34.6,
		description: 'L’un des plus anciens bassins de lave (339 km), bordant le cratère Théophile.',
	},
	{
		kind: 'mare',
		name: 'Mare Humorum',
		latitude: -24.48,
		longitude: -38.57,
		description: 'Bassin circulaire (420 km) cerné de failles concentriques (Rimae Hippalus).',
	},
	{
		kind: 'mare',
		name: 'Mare Nubium',
		latitude: -20.59,
		longitude: -17.29,
		description: 'Mer des Nuées (715 km), voisine du cratère Bullialdus.',
	},
	{
		kind: 'mare',
		name: 'Oceanus Procellarum',
		latitude: 20.67,
		longitude: -56.68,
		description:
			'Le plus vaste des « océans » lunaires (2592 km) — site d’Apollo 12 et de plusieurs sondes Surveyor.',
	},
	{
		kind: 'mare',
		name: 'Mare Frigoris',
		latitude: 57.59,
		longitude: -0.01,
		description: 'Mer du Froid (1446 km), longue bande sombre près du pôle nord, de forme non circulaire.',
	},
	{
		kind: 'mare',
		name: 'Mare Vaporum',
		latitude: 13.2,
		longitude: 4.09,
		description: 'Petite mer (243 km) bordée par les rainures Rimae Hyginus et Ariadaeus.',
	},
	{
		kind: 'mare',
		name: 'Sinus Iridum',
		latitude: 45.01,
		longitude: -31.67,
		description:
			'Baie des Arcs-en-ciel (249 km), cirque adossé à Mare Imbrium, cerné par les Montes Jura.',
	},
	{
		kind: 'mare',
		name: 'Sinus Medii',
		latitude: 1.63,
		longitude: 1.03,
		description: 'Baie du Centre (287 km) — marque approximativement le centre de la face visible.',
	},
	{
		kind: 'mare',
		name: 'Mare Orientale',
		latitude: -19.87,
		longitude: -94.67,
		description:
			'Bassin à anneaux multiples emblématique du limbe ouest : remplissage de lave central de ~294 km, mais anneaux externes (Montes Rook et Cordillera) s’étendant sur ~930 km.',
	},
	{
		kind: 'mare',
		name: 'Palus Putredinis',
		latitude: 27.36,
		longitude: 0.0,
		description: 'Marais de la Putréfaction (181 km) — plaine où Apollo 15 s’est posé, traversée par Rima Hadley.',
	},
];

// Chaînes de montagnes — coordonnées USGS Gazetteer of Planetary Nomenclature.
const MONTES_FEATURES: readonly Landmark[] = [
	{
		kind: 'montes',
		name: 'Montes Apenninus',
		latitude: 19.87,
		longitude: 0.03,
		description: 'Plus longue chaîne lunaire (600 km), bordure sud-est de Mare Imbrium — site d’Apollo 15.',
	},
	{
		kind: 'montes',
		name: 'Montes Alpes',
		latitude: 48.36,
		longitude: -0.58,
		description: 'Chaîne nord de Mare Imbrium (335 km), entaillée par la Vallis Alpes.',
	},
	{
		kind: 'montes',
		name: 'Montes Caucasus',
		latitude: 37.52,
		longitude: 9.93,
		description: 'Sépare Mare Serenitatis de Mare Imbrium (444 km).',
	},
	{
		kind: 'montes',
		name: 'Montes Carpatus',
		latitude: 14.57,
		longitude: -23.62,
		description: 'Bordure sud de Mare Imbrium (334 km), face au cratère Copernic.',
	},
	{
		kind: 'montes',
		name: 'Montes Jura',
		latitude: 47.49,
		longitude: -36.11,
		description: 'Arc montagneux (421 km) encerclant la baie Sinus Iridum.',
	},
	{
		kind: 'montes',
		name: 'Montes Haemus',
		latitude: 17.11,
		longitude: 12.03,
		description: 'Bordure sud-ouest de Mare Serenitatis (385 km).',
	},
	{
		kind: 'montes',
		name: 'Montes Taurus',
		latitude: 27.32,
		longitude: 40.34,
		description: 'Massifs (166 km) entourant la vallée de Taurus-Littrow — site d’Apollo 17.',
	},
	{
		kind: 'montes',
		name: 'Montes Cordillera',
		latitude: -19.44,
		longitude: -94.93,
		description: 'Anneau externe du bassin Mare Orientale (964 km), l’une des plus longues chaînes lunaires.',
	},
];

// Vallées/rainures — coordonnées USGS Gazetteer of Planetary Nomenclature.
const VALLES_FEATURES: readonly Landmark[] = [
	{
		kind: 'valles',
		name: 'Vallis Alpes',
		latitude: 49.21,
		longitude: 3.63,
		description: 'Large vallée-graben (155 km) traversant les Montes Alpes.',
	},
	{
		kind: 'valles',
		name: 'Vallis Schröteri',
		latitude: 26.16,
		longitude: -51.58,
		description: 'Plus grande rainure sinueuse lunaire (185 km), dite « Tête de Cobra », plateau d’Aristarque.',
	},
	{
		kind: 'valles',
		name: 'Rima Hadley',
		latitude: 25.72,
		longitude: 3.15,
		description: 'Rainure sinueuse (116 km) explorée en rover par l’équipage d’Apollo 15.',
	},
	{
		kind: 'valles',
		name: 'Rima Ariadaeus',
		latitude: 6.48,
		longitude: 13.44,
		description: 'L’une des rainures rectilignes les plus visibles (248 km), entre Vaporum et Tranquillitatis.',
	},
	{
		kind: 'valles',
		name: 'Rima Hyginus',
		latitude: 7.62,
		longitude: 6.77,
		description: 'Rainure jalonnée de petits cratères d’effondrement (204 km), centrée sur le cratère Hyginus.',
	},
	{
		kind: 'valles',
		name: 'Vallis Rheita',
		latitude: -42.51,
		longitude: 51.65,
		description: 'Longue vallée des hautes-terres australes (509 km), probablement liée aux éjectas du bassin Nectaris.',
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
	...MARE_FEATURES,
	...MONTES_FEATURES,
	...VALLES_FEATURES,
	...ARTEMIS_CANDIDATE_REGIONS,
];
