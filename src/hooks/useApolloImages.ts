import { useEffect, useState } from 'react';
import { APOLLO_MISSION_YEARS } from '../lib/apolloImages/missionYears';
import type {
	ApolloArchivalPhoto,
	NasaImageLink,
	NasaImageSearchResponse,
} from '../lib/apolloImages/types';

const MAX_PHOTOS = 3;

function cacheKey(missionName: string): string {
	return `moon-live:apollo-images:${missionName}`;
}

function pickUrl(links: NasaImageLink[] | undefined, rel: NasaImageLink['rel']): string | undefined {
	return links?.find((link) => link.rel === rel)?.href;
}

function pickFullUrl(links: NasaImageLink[] | undefined): string {
	const alternates = (links ?? []).filter((link) => link.rel === 'alternate' && link.width);
	if (alternates.length === 0) {
		return pickUrl(links, 'preview') ?? links?.[0]?.href ?? '';
	}
	return alternates.reduce((best, link) => ((link.width ?? 0) > (best.width ?? 0) ? link : best))
		.href;
}

function readCache(missionName: string): ApolloArchivalPhoto[] | null {
	try {
		const raw = window.localStorage.getItem(cacheKey(missionName));
		return raw ? (JSON.parse(raw) as ApolloArchivalPhoto[]) : null;
	} catch {
		return null;
	}
}

function writeCache(missionName: string, photos: ApolloArchivalPhoto[]): void {
	try {
		window.localStorage.setItem(cacheKey(missionName), JSON.stringify(photos));
	} catch {
		// localStorage unavailable — cache is a pure optimization, safe to skip.
	}
}

export function useApolloImages(missionName: string) {
	const [photos, setPhotos] = useState<ApolloArchivalPhoto[]>(() => readCache(missionName) ?? []);

	useEffect(() => {
		if (!missionName || readCache(missionName)) return;

		const year = APOLLO_MISSION_YEARS[missionName];
		const query = encodeURIComponent(`${missionName} lunar surface`);
		const url = `https://images-api.nasa.gov/search?q=${query}&media_type=image&year_start=${year}&year_end=${year}`;

		fetch(url)
			.then((response) => (response.ok ? (response.json() as Promise<NasaImageSearchResponse>) : null))
			.then((data) => {
				if (!data) return;
				const found: ApolloArchivalPhoto[] = data.collection.items
					.slice(0, MAX_PHOTOS)
					.map((item) => ({
						nasaId: item.data[0]?.nasa_id ?? '',
						title: item.data[0]?.title ?? missionName,
						thumbnailUrl: pickUrl(item.links, 'preview') ?? '',
						fullUrl: pickFullUrl(item.links),
					}))
					.filter((photo) => photo.thumbnailUrl);
				setPhotos(found);
				writeCache(missionName, found);
			})
			.catch(() => {
				// Archival photos are a nice-to-have enrichment — fail silently,
				// the tooltip already has a text description on its own.
			});
	}, [missionName]);

	return photos;
}
