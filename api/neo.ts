import type { VercelRequest, VercelResponse } from '@vercel/node';

const FEED_WINDOW_DAYS = 7;

function getFeedDateRange(): { start: string; end: string } {
	const start = new Date();
	const end = new Date(start.getTime() + (FEED_WINDOW_DAYS - 1) * 86_400_000);
	const toISODate = (date: Date) => date.toISOString().slice(0, 10);
	return { start: toISODate(start), end: toISODate(end) };
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
	const { start, end } = getFeedDateRange();
	const apiKey = process.env.NASA_API_KEY ?? 'DEMO_KEY';
	const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${apiKey}`;

	try {
		const upstream = await fetch(url);
		const body = await upstream.text();

		if (!upstream.ok) {
			res.status(upstream.status >= 500 ? 502 : upstream.status).json({
				error: 'nasa_api_error',
				message: `NASA NeoWs a répondu avec le statut ${upstream.status}.`,
			});
			return;
		}

		res.setHeader('Content-Type', 'application/json');
		res.status(200).send(body);
	} catch {
		res.status(502).json({
			error: 'nasa_api_unreachable',
			message: 'Impossible de joindre le service NASA NeoWs.',
		});
	}
}
