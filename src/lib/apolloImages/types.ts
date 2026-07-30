export interface NasaImageLink {
	href: string;
	rel: 'preview' | 'alternate' | 'canonical';
	render?: string;
	width?: number;
	height?: number;
}

export interface NasaImageItem {
	data: Array<{
		nasa_id: string;
		title: string;
	}>;
	links?: NasaImageLink[];
}

export interface NasaImageSearchResponse {
	collection: {
		items: NasaImageItem[];
	};
}

export interface ApolloArchivalPhoto {
	nasaId: string;
	title: string;
	thumbnailUrl: string;
	fullUrl: string;
}
