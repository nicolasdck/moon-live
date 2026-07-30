import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { BalanceSectionContent } from './content';

export function BalanceSection({
	section,
	index,
	visual,
}: {
	section: BalanceSectionContent;
	index: number;
	visual?: ReactNode;
}) {
	const Icon = section.icon;
	const reversed = index % 2 === 1;

	return (
		<motion.section
			id={section.id}
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.3 }}
			transition={{ duration: 0.5, ease: 'easeOut' }}
			className={`flex scroll-mt-6 flex-col items-center gap-6 rounded-2xl border border-border bg-surface p-6 sm:p-8 md:flex-row ${
				reversed ? 'md:flex-row-reverse' : ''
			}`}
		>
			<div className="flex w-full shrink-0 items-center justify-center md:w-56">
				{visual ?? (
					<div className="flex h-28 w-28 items-center justify-center rounded-full bg-bg-elevated text-accent">
						<Icon size={44} />
					</div>
				)}
			</div>
			<div className="flex-1">
				<h2 className="text-lg font-semibold text-text">{section.title}</h2>
				<p className="mt-2 text-sm text-text-muted">{section.body}</p>
				<div className="mt-4 flex items-start gap-2 rounded-xl border border-border bg-bg-elevated p-3 text-xs text-text-muted">
					<Sparkles size={14} className="mt-0.5 shrink-0 text-accent" />
					<span>{section.fact}</span>
				</div>
			</div>
		</motion.section>
	);
}
