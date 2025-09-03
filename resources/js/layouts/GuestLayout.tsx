import AuthLayout from '@/layouts/auth-layout';
import { PropsWithChildren } from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <AuthLayout title="Welcome" description="Sign in to your account">
            {children}
        </AuthLayout>
    );
}
