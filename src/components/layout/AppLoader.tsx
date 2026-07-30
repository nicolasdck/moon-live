export function AppLoader() {
	return (
		<div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-bg">
			<img
				src="/full-red-moon.png"
				alt="Chargement de Moon Live"
				className="animate-loader-spin h-28 w-28 drop-shadow-[0_0_20px_rgba(255,90,77,0.45)]"
			/>
			<p className="text-sm tracking-[0.3em] text-text-muted uppercase">Moon Live</p>
		</div>
	);
}
