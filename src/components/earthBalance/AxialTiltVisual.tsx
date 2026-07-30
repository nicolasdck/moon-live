interface PlanetProps {
	cx: number;
	wedgeDeg: number;
	tiltDeg: number;
	wedgeColor: string;
}

function TiltedPlanet({ cx, wedgeDeg, tiltDeg, wedgeColor }: PlanetProps) {
	const cy = 70;
	const r = 34;
	const axisLength = r + 22;
	const rad = (deg: number) => (deg * Math.PI) / 180;

	const axisTop = {
		x: cx + axisLength * Math.sin(rad(tiltDeg)),
		y: cy - axisLength * Math.cos(rad(tiltDeg)),
	};
	const axisBottom = {
		x: cx - axisLength * Math.sin(rad(tiltDeg)),
		y: cy + axisLength * Math.cos(rad(tiltDeg)),
	};

	const wedgeStart = rad(-90 - wedgeDeg / 2);
	const wedgeEnd = rad(-90 + wedgeDeg / 2);
	const wedgeR = axisLength;
	const p1 = { x: cx + wedgeR * Math.cos(wedgeStart), y: cy + wedgeR * Math.sin(wedgeStart) };
	const p2 = { x: cx + wedgeR * Math.cos(wedgeEnd), y: cy + wedgeR * Math.sin(wedgeEnd) };

	return (
		<g>
			<path
				d={`M ${cx} ${cy} L ${p1.x} ${p1.y} A ${wedgeR} ${wedgeR} 0 0 1 ${p2.x} ${p2.y} Z`}
				fill={wedgeColor}
				opacity={0.18}
			/>
			<line
				x1={axisTop.x}
				y1={axisTop.y}
				x2={axisBottom.x}
				y2={axisBottom.y}
				stroke="var(--color-text-muted)"
				strokeWidth={1.5}
				strokeDasharray="3 3"
			/>
			<circle cx={cx} cy={cy} r={r} fill="url(#earth-gradient)" stroke="var(--color-border)" />
		</g>
	);
}

export function AxialTiltVisual() {
	return (
		<svg viewBox="0 0 320 150" className="w-full max-w-sm" role="presentation">
			<defs>
				<radialGradient id="earth-gradient" cx="35%" cy="30%" r="75%">
					<stop offset="0%" stopColor="#3d6b8f" />
					<stop offset="60%" stopColor="#1c3a52" />
					<stop offset="100%" stopColor="#0d1f30" />
				</radialGradient>
			</defs>
			<TiltedPlanet cx={90} wedgeDeg={8} tiltDeg={23} wedgeColor="var(--color-accent)" />
			<TiltedPlanet cx={230} wedgeDeg={55} tiltDeg={23} wedgeColor="var(--color-warn)" />
			<text x={90} y={135} textAnchor="middle" className="fill-text-muted text-[10px]">
				Avec la Lune — stable
			</text>
			<text x={230} y={135} textAnchor="middle" className="fill-text-muted text-[10px]">
				Sans grand satellite — chaotique
			</text>
		</svg>
	);
}
