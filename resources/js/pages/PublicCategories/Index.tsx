import GuestLayout from '@/layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function PublicCategoryIndex() {
    return (
        <GuestLayout>
            <Head title="Categories" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Public Categories Listing</div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
