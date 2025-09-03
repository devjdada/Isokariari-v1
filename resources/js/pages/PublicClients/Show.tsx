import GuestLayout from '@/layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function PublicClientShow() {
    return (
        <GuestLayout>
            <Head title="Client Details" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Public Client Details</div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
