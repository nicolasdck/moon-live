import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

function getNeoFeedPath(apiKey: string): string {
	const start = new Date();
	const end = new Date(start.getTime() + 6 * 86_400_000);
	const toISODate = (date: Date) => date.toISOString().slice(0, 10);
	return `/neo/rest/v1/feed?start_date=${toISODate(start)}&end_date=${toISODate(end)}&api_key=${apiKey}`;
}

export default defineConfig(({ mode }) => {
	// Empty prefix loads all env vars (not just VITE_-prefixed ones) from
	// .env.local, since NASA_API_KEY is server-only and must never reach the client.
	const env = loadEnv(mode, process.cwd(), '');
	const nasaApiKey = env.NASA_API_KEY ?? 'DEMO_KEY';

	return {
		server: {
			proxy: {
				// Mirrors api/neo.ts (the Vercel serverless function used in production)
				// so `npm run dev` works against the real NASA API without `vercel dev`.
				'/api/neo': {
					target: 'https://api.nasa.gov',
					changeOrigin: true,
					rewrite: () => getNeoFeedPath(nasaApiKey),
				},
			},
		},
		plugins: [
			react(),
			tailwindcss(),
			VitePWA({
				registerType: 'prompt',
				includeAssets: ['favicon.ico', 'moon-icon-master.svg'],
				manifest: {
					id: '/',
					name: 'Moon Live',
					short_name: 'Moon Live',
					description:
						"Suivi scientifique et artistique de la Lune en temps réel : phase, distance, lever/coucher et données orbitales.",
					lang: 'fr',
					start_url: '/',
					scope: '/',
					display: 'standalone',
					orientation: 'portrait',
					background_color: '#05070f',
					theme_color: '#05070f',
					categories: ['education', 'weather', 'lifestyle'],
					icons: [
						{
							src: 'pwa-64x64.png',
							sizes: '64x64',
							type: 'image/png',
						},
						{
							src: 'pwa-192x192.png',
							sizes: '192x192',
							type: 'image/png',
						},
						{
							src: 'pwa-512x512.png',
							sizes: '512x512',
							type: 'image/png',
						},
						{
							src: 'maskable-icon-512x512.png',
							sizes: '512x512',
							type: 'image/png',
							purpose: 'maskable',
						},
					],
				},
				workbox: {
					globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
				},
			}),
		],
	};
});
