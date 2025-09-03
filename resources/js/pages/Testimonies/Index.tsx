import GuestLayout from '@/layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Testimony {
    id: number;
    name: string;
    position: string;
    image: string;
    testimony: string;
}

export default function TestimonyPublicIndex({ testimonies }: PageProps<{ testimonies: Testimony[] }>) {
    return (
        <GuestLayout>
            <Head title="Testimonies" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="mb-4 text-lg font-medium">What Our Clients Say</h3>
                            {testimonies.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {testimonies.map((testimony) => (
                                        <div key={testimony.id} className="rounded-md border p-4">
                                            {testimony.image && (
                                                <img
                                                    src={testimony.image}
                                                    alt={testimony.name}
                                                    className="mb-4 h-48 w-full rounded-md object-cover"
                                                />
                                            )}
                                            <h4 className="text-lg font-semibold">{testimony.name}</h4>
                                            <p className="text-gray-600">{testimony.position}</p>
                                            <div dangerouslySetInnerHTML={{ __html: testimony.testimony }} className="mt-2 text-sm text-gray-700" />
                                            <Link href={route('testimonies.show', testimony.id)} className="mt-2 block text-blue-600 hover:underline">
                                                Read More
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No testimonies found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
