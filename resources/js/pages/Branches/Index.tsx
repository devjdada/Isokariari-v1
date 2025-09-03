import GuestLayout from '@/layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Branch {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    lng: number;
    lat: number;
}

export default function BranchPublicIndex({ branches }: PageProps<{ branches: Branch[] }>) {
    return (
        <GuestLayout>
            <Head title="Our Branches" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="mb-4 text-lg font-medium">Our Branches</h3>
                            {branches.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {branches.map((branch) => (
                                        <div key={branch.id} className="rounded-md border p-4">
                                            <h4 className="text-lg font-semibold">{branch.name}</h4>
                                            <p className="text-gray-600">{branch.address}</p>
                                            <p className="text-gray-600">{branch.phone}</p>
                                            <p className="text-gray-600">{branch.email}</p>
                                            <Link href={route('branches.show', branch.id)} className="mt-2 block text-blue-600 hover:underline">
                                                View Details
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No branches found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
