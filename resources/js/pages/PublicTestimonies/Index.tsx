import GuestLayout from '@/layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function PublicTestimonyIndex() {
    return (
        <GuestLayout>
            <Head title="Testimonies" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Public Testimonies Listing</div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
