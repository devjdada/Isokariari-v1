import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Client, PageProps } from '@/types';
import { Head } from '@inertiajs/react';

export default function ClientShow({ auth, client }: PageProps<{ client: Client }>) {
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Client Details</h2>}>
            <Head title={client.name} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <h3 className="mb-4 text-lg font-medium">{client.name}</h3>
                        <p>
                            <strong>Position:</strong> {client.position}
                        </p>
                        <p>
                            <strong>Company:</strong> {client.company}
                        </p>
                        <p>
                            <strong>Link:</strong>{' '}
                            <a href={client.link} target="_blank" rel="noopener noreferrer">
                                {client.link}
                            </a>
                        </p>
                        {client.image_url && (
                            <div className="mt-4">
                                {client.image_url}
                                <img src={client.image_url} alt={client.name} className="h-auto max-w-xs rounded-md" />
                            </div>
                        )}
                        <div className="mt-4">
                            <strong>Content:</strong>
                            <div dangerouslySetInnerHTML={{ __html: client.content }} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
