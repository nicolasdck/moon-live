export function AppLoader() {
	return (
		<div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-bg">
			<div className="relative h-28 w-28">
				<svg
					viewBox="0 0 100 100"
					className="animate-helmet-spin h-full w-full drop-shadow-[0_0_18px_rgba(203,213,255,0.35)]"
					role="img"
					aria-label="Chargement de Moon Live"
				>
					<defs>
						<radialGradient id="helmetShell" cx="35%" cy="30%" r="75%">
							<stop offset="0%" stopColor="#f4f6ff" />
							<stop offset="55%" stopColor="#cbd5ff" />
							<stop offset="100%" stopColor="#5f6aa8" />
						</radialGradient>
						<linearGradient id="visor" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#0b1230" />
							<stop offset="100%" stopColor="#1c2454" />
						</linearGradient>
						<clipPath id="visorClip">
							<ellipse cx="50" cy="52" rx="30" ry="26" />
						</clipPath>
					</defs>

					<circle cx="50" cy="46" r="40" fill="url(#helmetShell)" />
					<rect x="10" y="70" width="80" height="18" rx="9" fill="#8d95c9" />

					<ellipse cx="50" cy="52" rx="30" ry="26" fill="url(#visor)" />
					<g clipPath="url(#visorClip)">
						<rect
							className="animate-visor-glint"
							x="10"
							y="10"
							width="30"
							height="80"
							fill="#eef1ff"
							opacity="0.4"
						/>
					</g>
				</svg>
			</div>
			<p className="text-sm tracking-[0.3em] text-text-muted uppercase">Moon Live</p>
		</div>
	);
}
