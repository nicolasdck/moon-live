import { MoonGlobeCanvas } from '../components/globe/MoonGlobeCanvas';
import { GlobeLegend } from '../components/globe/GlobeLegend';

export default function GlobePage() {
	return (
		<div className="flex flex-col gap-4">
			<div className="h-[60vh] min-h-[420px] overflow-hidden rounded-2xl border border-border bg-surface">
				<MoonGlobeCanvas />
			</div>
			<GlobeLegend />
		</div>
	);
}
