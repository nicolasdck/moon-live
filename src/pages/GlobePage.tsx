import { useState } from 'react';
import { MoonGlobeCanvas } from '../components/globe/MoonGlobeCanvas';
import { GlobeLegend } from '../components/globe/GlobeLegend';
import { ALL_LANDMARK_KINDS } from '../lib/moon/landmarkStyles';
import type { LandmarkKind } from '../lib/moon/landmarks';

export default function GlobePage() {
	const [activeKinds, setActiveKinds] = useState<Set<LandmarkKind>>(
		() => new Set(ALL_LANDMARK_KINDS),
	);

	const toggleKind = (kind: LandmarkKind) => {
		setActiveKinds((current) => {
			const next = new Set(current);
			if (next.has(kind)) {
				next.delete(kind);
			} else {
				next.add(kind);
			}
			return next;
		});
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="h-[60vh] min-h-105 overflow-hidden rounded-2xl border border-border bg-surface">
				<MoonGlobeCanvas activeKinds={activeKinds} />
			</div>
			<GlobeLegend activeKinds={activeKinds} onToggle={toggleKind} />
		</div>
	);
}
