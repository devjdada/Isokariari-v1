import GuestLayout from '@/layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

interface Branch {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    lng: number;
    lat: number;
}

export default function BranchPublicShow({ branch }: PageProps<{ branch: Branch }>) {
    return (
        <GuestLayout>
            <Head title={branch.name} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="mb-4 text-lg font-medium">{branch.name}</h3>
                            <p>
                                <strong>Address:</strong> {branch.address}
                            </p>
                            <p>
                                <strong>Phone:</strong> {branch.phone}
                            </p>
                            <p>
                                <strong>Email:</strong> {branch.email}
                            </p>
                            {branch.lng && branch.lat && (
                                <p>
                                    <strong>Coordinates:</strong> {branch.lat}, {branch.lng}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
