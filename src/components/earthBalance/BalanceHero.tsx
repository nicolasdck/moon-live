import { motion } from 'framer-motion';

export function BalanceHero() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: 'easeOut' }}
			className="rounded-2xl border border-border bg-surface p-6 text-center sm:p-10"
		>
			<h1 className="text-2xl font-semibold text-text sm:text-3xl">L'Équilibre Terrestre</h1>
			<p className="mx-auto mt-3 max-w-2xl text-sm text-text-muted sm:text-base">
				Bien plus qu'un objet à observer dans le ciel nocturne, la Lune façonne silencieusement
				les conditions qui rendent la vie sur Terre possible et stable. Voici quatre façons dont
				notre satellite influence notre planète.
			</p>
		</motion.div>
	);
}
