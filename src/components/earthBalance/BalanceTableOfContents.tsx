import type { BalanceSectionContent } from './content';

export function BalanceTableOfContents({ sections }: { sections: readonly BalanceSectionContent[] }) {
	return (
		<nav className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-border bg-surface p-3">
			{sections.map((section) => (
				<a
					key={section.id}
					href={`#${section.id}`}
					className="rounded-full px-3 py-1.5 text-sm text-text-muted transition-colors hover:bg-bg-elevated hover:text-text"
				>
					{section.title}
				</a>
			))}
		</nav>
	);
}
