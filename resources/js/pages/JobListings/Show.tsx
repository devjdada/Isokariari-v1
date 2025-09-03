import GuestLayout from '@/layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

interface JobListing {
    id: number;
    title: string;
    slug: string;
    description: string;
    location: string;
    type: string;
    status: boolean;
}

export default function JobListingPublicShow({ jobListing }: PageProps<{ jobListing: JobListing }>) {
    return (
        <GuestLayout>
            <Head title={jobListing.title} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="mb-4 text-lg font-medium">{jobListing.title}</h3>
                            <p>
                                <strong>Location:</strong> {jobListing.location}
                            </p>
                            <p>
                                <strong>Type:</strong> {jobListing.type}
                            </p>
                            <div dangerouslySetInnerHTML={{ __html: jobListing.description }} />
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
