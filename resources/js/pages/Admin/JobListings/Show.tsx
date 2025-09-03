import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import type { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

interface JobListing {
    id: number;
    title: string;
    department: string;
    location: string;
    description: string;
    requirements: string;
    responsibilities: string;
    is_active: boolean;
    closing_date: string | null;
    posted_date: string | null;
    created_at: string;
    updated_at: string;
}

export default function JobListingShow({ auth, jobListing }: PageProps<{ jobListing: JobListing }>) {
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Job Listing Details</h2>}>
            <Head title={jobListing.title} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <h3 className="mb-4 text-lg font-medium">{jobListing.title}</h3>
                        <p>
                            <strong>Department:</strong> {jobListing.department}
                        </p>
                        <p>
                            <strong>Location:</strong> {jobListing.location}
                        </p>
                        <p>
                            <strong>Active:</strong> {jobListing.is_active ? 'Yes' : 'No'}
                        </p>
                        {jobListing.closing_date && (
                            <p>
                                <strong>Closing Date:</strong> {new Date(jobListing.closing_date).toLocaleDateString()}
                            </p>
                        )}
                        {jobListing.posted_date && (
                            <p>
                                <strong>Posted Date:</strong> {new Date(jobListing.posted_date).toLocaleDateString()}
                            </p>
                        )}
                        <div className="mt-4">
                            <strong>Description:</strong>
                            <div dangerouslySetInnerHTML={{ __html: jobListing.description }} />
                        </div>
                        <div className="mt-4">
                            <strong>Requirements:</strong>
                            <div dangerouslySetInnerHTML={{ __html: jobListing.requirements }} />
                        </div>
                        <div className="mt-4">
                            <strong>Responsibilities:</strong>
                            <div dangerouslySetInnerHTML={{ __html: jobListing.responsibilities }} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
