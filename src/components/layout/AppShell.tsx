import type { ReactNode } from 'react';
import { Header } from './Header';
import { UpdatePrompt } from './UpdatePrompt';

export function AppShell({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen bg-bg text-text">
			<Header />
			<main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
			<UpdatePrompt />
		</div>
	);
}
