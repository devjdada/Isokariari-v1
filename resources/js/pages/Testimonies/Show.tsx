import GuestLayout from '@/layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

interface Testimony {
    id: number;
    name: string;
    position: string;
    image: string;
    testimony: string;
}

export default function TestimonyPublicShow({ testimony }: PageProps<{ testimony: Testimony }>) {
    return (
        <GuestLayout>
            <Head title={testimony.name} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="mb-4 text-lg font-medium">{testimony.name}</h3>
                            <p className="mb-4 text-gray-600">{testimony.position}</p>
                            {testimony.image && (
                                <img src={testimony.image} alt={testimony.name} className="mb-4 h-64 w-full rounded-md object-cover" />
                            )}
                            <div dangerouslySetInnerHTML={{ __html: testimony.testimony }} />
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
