import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
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
});
