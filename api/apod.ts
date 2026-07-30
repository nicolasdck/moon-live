import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
	const apiKey = process.env.NASA_API_KEY ?? 'DEMO_KEY';
	const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

	try {
		const upstream = await fetch(url);
		const body = await upstream.text();

		if (!upstream.ok) {
			const message =
				upstream.status === 429
					? "Limite de requêtes NASA atteinte (clé DEMO_KEY : 30/heure, 50/jour). Réessayez dans quelques minutes."
					: `NASA APOD a répondu avec le statut ${upstream.status}.`;
			res.status(upstream.status >= 500 ? 502 : upstream.status).json({
				error: 'nasa_api_error',
				message,
			});
			return;
		}

		res.setHeader('Content-Type', 'application/json');
		res.status(200).send(body);
	} catch {
		res.status(502).json({
			error: 'nasa_api_unreachable',
			message: 'Impossible de joindre le service NASA APOD.',
		});
	}
}
