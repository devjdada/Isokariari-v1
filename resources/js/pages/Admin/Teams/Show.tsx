import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import type { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

interface Team {
    id: number;
    name: string;
    facebook: string | null;
    twitter: string | null;
    linkedin: string | null;
    title: string | null;
    image: string | null;
    email: string;
    status: boolean;
    about: string | null;
    created_at: string;
    updated_at: string;
}

export default function TeamShow({ auth, team }: PageProps<{ team: Team }>) {
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Team Member Details</h2>}>
            <Head title={team.name} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <h3 className="mb-4 text-lg font-medium">{team.name}</h3>
                        <p>
                            <strong>Email:</strong> {team.email}
                        </p>
                        {team.title && (
                            <p>
                                <strong>Title:</strong> {team.title}
                            </p>
                        )}
                        {team.facebook && (
                            <p>
                                <strong>Facebook:</strong>{' '}
                                <a href={team.facebook} target="_blank" rel="noopener noreferrer">
                                    {team.facebook}
                                </a>
                            </p>
                        )}
                        {team.twitter && (
                            <p>
                                <strong>Twitter:</strong>{' '}
                                <a href={team.twitter} target="_blank" rel="noopener noreferrer">
                                    {team.twitter}
                                </a>
                            </p>
                        )}
                        {team.linkedin && (
                            <p>
                                <strong>LinkedIn:</strong>{' '}
                                <a href={team.linkedin} target="_blank" rel="noopener noreferrer">
                                    {team.linkedin}
                                </a>
                            </p>
                        )}
                        {team.image && (
                            <div className="mt-4">
                                <img src={`/storage/${team.image}`} alt={team.name} className="h-auto max-w-xs rounded-md" />
                            </div>
                        )}
                        <p>
                            <strong>Status:</strong> {team.status ? 'Active' : 'Inactive'}
                        </p>
                        {team.about && (
                            <div className="mt-4">
                                <strong>About:</strong>
                                <div dangerouslySetInnerHTML={{ __html: team.about }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
