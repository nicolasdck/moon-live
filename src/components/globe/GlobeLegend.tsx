import { ALL_LANDMARK_KINDS, LANDMARK_KIND_META } from '../../lib/moon/landmarkStyles';
import type { LandmarkKind } from '../../lib/moon/landmarks';

export function GlobeLegend({
	activeKinds,
	onToggle,
}: {
	activeKinds: ReadonlySet<LandmarkKind>;
	onToggle: (kind: LandmarkKind) => void;
}) {
	return (
		<div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-text-muted">
			<div className="flex flex-wrap items-center gap-2">
				{ALL_LANDMARK_KINDS.map((kind) => (
					<FilterToggle
						key={kind}
						kind={kind}
						active={activeKinds.has(kind)}
						onToggle={() => onToggle(kind)}
					/>
				))}
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

function FilterToggle({
	kind,
	active,
	onToggle,
}: {
	kind: LandmarkKind;
	active: boolean;
	onToggle: () => void;
}) {
	const { color, label } = LANDMARK_KIND_META[kind];

	return (
		<button
			type="button"
			onClick={onToggle}
			aria-pressed={active}
			className={`flex items-center gap-2 rounded-full border px-2.5 py-1 transition-opacity ${
				active ? 'border-border' : 'border-border opacity-40'
			}`}
		>
			<span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
			{label}
		</button>
	);
}
