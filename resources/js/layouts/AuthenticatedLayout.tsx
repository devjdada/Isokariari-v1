import AppLayout from '@/layouts/app-layout';
import { PropsWithChildren } from 'react';

export default function AuthenticatedLayout({ user, header, children }: PropsWithChildren<{ user: any; header?: React.ReactNode }>) {
    return (
        <AppLayout>
            {header && (
                <header className="bg-background shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}
            <main>{children}</main>
        </AppLayout>
    );
}
