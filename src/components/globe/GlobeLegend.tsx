export function GlobeLegend() {
	return (
		<div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-text-muted">
			<div className="flex flex-wrap items-center gap-4">
				<LegendItem color="#9ca3af" label="Cratère" />
				<LegendItem color="#f2c94c" label="Site Apollo" />
				<LegendItem color="#ff8a4c" label="Région candidate Artemis IV" />
			</div>
			<p>
				Imagerie : NASA LRO/LROC WAC (couleur) &amp; LOLA (relief), via le{' '}
				<a
					href="https://svs.gsfc.nasa.gov/4720/"
					target="_blank"
					rel="noreferrer"
					className="underline hover:text-text"
				>
					CGI Moon Kit
				</a>{' '}
				(NASA SVS, domaine public)
			</p>
		</div>
	);
}

function LegendItem({ color, label }: { color: string; label: string }) {
	return (
		<span className="flex items-center gap-2">
			<span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
			{label}
		</span>
	);
}
