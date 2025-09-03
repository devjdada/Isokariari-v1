import GuestLayout from '@/layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

interface Team {
    id: number;
    name: string;
    position: string;
    image: string;
    bio: string;
}

export default function TeamPublicShow({ team }: PageProps<{ team: Team }>) {
    return (
        <GuestLayout>
            <Head title={team.name} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="mb-4 text-lg font-medium">{team.name}</h3>
                            <p className="mb-4 text-gray-600">{team.position}</p>
                            {team.image && <img src={team.image} alt={team.name} className="mb-4 h-64 w-full rounded-md object-cover" />}
                            <div dangerouslySetInnerHTML={{ __html: team.bio }} />
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
