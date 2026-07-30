import type { ReactNode } from 'react';
import { Header } from './Header';
import { UpdatePrompt } from './UpdatePrompt';
import { InstallBanner } from './InstallBanner';

export function AppShell({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen bg-bg text-text">
			<Header />
			<main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
			<div className="fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-3 px-4">
				<InstallBanner />
				<UpdatePrompt />
			</div>
		</div>
	);
}
