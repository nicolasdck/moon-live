export interface FullMoonNameInfo {
	name: string;
	nameFr: string;
	emoji: string;
	description: string;
}

/**
 * Traditional Farmer's Almanac / Native American full moon names, indexed by
 * calendar month (0 = January). This is the most commonly cited variant;
 * regional traditions differ, and some years shift "Harvest Moon" onto
 * September or October's full moon depending on the equinox — not modeled
 * here for simplicity.
 */
export const FULL_MOON_NAMES: readonly FullMoonNameInfo[] = [
	{
		name: 'Wolf Moon',
		nameFr: 'Lune du Loup',
		emoji: '🐺',
		description: 'Les loups hurlaient de faim près des villages en plein cœur de l’hiver.',
	},
	{
		name: 'Snow Moon',
		nameFr: 'Lune de Neige',
		emoji: '❄️',
		description: 'Période des chutes de neige les plus abondantes de l’année.',
	},
	{
		name: 'Worm Moon',
		nameFr: 'Lune des Vers',
		emoji: '🪱',
		description: 'La terre commence à dégeler et les vers de terre réapparaissent.',
	},
	{
		name: 'Pink Moon',
		nameFr: 'Lune Rose',
		emoji: '🌸',
		description: 'Floraison du phlox rose, l’une des premières fleurs sauvages du printemps.',
	},
	{
		name: 'Flower Moon',
		nameFr: 'Lune des Fleurs',
		emoji: '🌼',
		description: 'Abondance de fleurs sauvages en cette saison.',
	},
	{
		name: 'Strawberry Moon',
		nameFr: 'Lune des Fraises',
		emoji: '🍓',
		description: 'Période traditionnelle de récolte des fraises sauvages.',
	},
	{
		name: 'Buck Moon',
		nameFr: 'Lune du Cerf',
		emoji: '🦌',
		description: 'Les bois des jeunes cerfs commencent à repousser à cette période de l’année.',
	},
	{
		name: 'Sturgeon Moon',
		nameFr: 'Lune de l’Esturgeon',
		emoji: '🐟',
		description: 'Période où l’esturgeon était le plus facile à pêcher dans les Grands Lacs.',
	},
	{
		name: 'Corn Moon',
		nameFr: 'Lune du Maïs',
		emoji: '🌽',
		description: 'Période des récoltes de maïs.',
	},
	{
		name: "Hunter's Moon",
		nameFr: 'Lune du Chasseur',
		emoji: '🏹',
		description: 'Période traditionnelle de chasse pour constituer des réserves avant l’hiver.',
	},
	{
		name: 'Beaver Moon',
		nameFr: 'Lune du Castor',
		emoji: '🦫',
		description: 'Période de pose des pièges à castor avant que les cours d’eau ne gèlent.',
	},
	{
		name: 'Cold Moon',
		nameFr: 'Lune Froide',
		emoji: '🥶',
		description: 'Les nuits les plus longues et les plus froides de l’année.',
	},
];

export function getFullMoonName(date: Date): FullMoonNameInfo {
	return FULL_MOON_NAMES[date.getMonth()];
}
