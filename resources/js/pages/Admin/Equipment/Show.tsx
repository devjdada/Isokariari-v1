import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import type { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

interface Equipment {
    id: number;
    name: string;
    position: string | null;
    company: string | null;
    link: string | null;
    content: string | null;
    image: string | null;
    created_at: string;
    updated_at: string;
}

export default function EquipmentShow({ auth, equipment }: PageProps<{ equipment: Equipment }>) {
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Equipment Details</h2>}>
            <Head title={equipment.name} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <h3 className="mb-4 text-lg font-medium">{equipment.name}</h3>
                        <p>
                            <strong>Position:</strong> {equipment.position}
                        </p>
                        <p>
                            <strong>Company:</strong> {equipment.company}
                        </p>
                        {equipment.link && (
                            <p>
                                <strong>Link:</strong>{' '}
                                <a href={equipment.link} target="_blank" rel="noopener noreferrer">
                                    {equipment.link}
                                </a>
                            </p>
                        )}
                        {equipment.image && (
                            <div className="mt-4">
                                <img src={`/storage/${equipment.image}`} alt={equipment.name} className="h-auto max-w-xs rounded-md" />
                            </div>
                        )}
                        {equipment.content && (
                            <div className="mt-4">
                                <strong>Content:</strong>
                                <div dangerouslySetInnerHTML={{ __html: equipment.content }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
