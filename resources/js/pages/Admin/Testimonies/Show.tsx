import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import type { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

interface Testimony {
    id: number;
    name: string;
    position: string | null;
    company: string | null;
    content: string;
    image: string | null;
    created_at: string;
    updated_at: string;
}

export default function TestimonyShow({ auth, testimony }: PageProps<{ testimony: Testimony }>) {
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Testimony Details</h2>}>
            <Head title={testimony.name} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <h3 className="mb-4 text-lg font-medium">{testimony.name}</h3>
                        <p>
                            <strong>Position:</strong> {testimony.position}
                        </p>
                        <p>
                            <strong>Company:</strong> {testimony.company}
                        </p>
                        {testimony.image && (
                            <div className="mt-4">
                                <img src={`/storage/${testimony.image}`} alt={testimony.name} className="h-auto max-w-xs rounded-md" />
                            </div>
                        )}
                        <div className="mt-4">
                            <strong>Content:</strong>
                            <div dangerouslySetInnerHTML={{ __html: testimony.content }} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
