import { BalanceHero } from '../components/earthBalance/BalanceHero';
import { BalanceSection } from '../components/earthBalance/BalanceSection';
import { AxialTiltVisual } from '../components/earthBalance/AxialTiltVisual';
import { BALANCE_SECTIONS } from '../components/earthBalance/content';

export default function EarthBalancePage() {
	return (
		<div className="flex flex-col gap-5">
			<BalanceHero />
			{BALANCE_SECTIONS.map((section, index) => (
				<BalanceSection
					key={section.id}
					section={section}
					index={index}
					visual={section.id === 'axe' ? <AxialTiltVisual /> : undefined}
				/>
			))}
		</div>
	);
}
