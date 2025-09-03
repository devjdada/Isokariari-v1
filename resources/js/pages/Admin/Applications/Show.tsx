import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';

interface JobListing {
    id: number;
    title: string;
}

interface Application {
    id: number;
    job_id: number | null;
    job_listing?: JobListing; // Optional, as job_id can be null
    full_name: string;
    email: string;
    phone: string;
    pay: string;
    location: string;
    cover: string;
    cv: string;
    letter: string;
    created_at: string;
}

interface ApplicationShowProps extends PageProps {
    application: Application;
}

export default function ApplicationShow({ auth, application }: ApplicationShowProps) {
    const handleDownload = (url: string, filename: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Application Details</h2>}
        >
            <Head title={`Application from ${application.full_name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                            <Link href={route('admin.applications.index')}>
                                <Button variant="outline">
                                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Applications
                                </Button>
                            </Link>
                            <h3 className="text-lg font-medium">Application from {application.full_name}</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600"><strong>Job Applied For:</strong> {application.job_listing ? application.job_listing.title : 'Open Application'}</p>
                                <p className="text-gray-600"><strong>Full Name:</strong> {application.full_name}</p>
                                <p className="text-gray-600"><strong>Email:</strong> {application.email}</p>
                                <p className="text-gray-600"><strong>Phone:</strong> {application.phone}</p>
                                <p className="text-gray-600"><strong>Expected Pay:</strong> {application.pay}</p>
                                <p className="text-gray-600"><strong>Location:</strong> {application.location}</p>
                                <p className="text-gray-600"><strong>Applied On:</strong> {new Date(application.created_at).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-gray-600"><strong>Cover Letter:</strong></p>
                                <p className="text-gray-800 whitespace-pre-wrap">{application.cover}</p>
                            </div>
                        </div>

                        <div className="mt-6 flex space-x-4">
                            {application.cv && (
                                <Button onClick={() => handleDownload(application.cv, `CV_${application.full_name}.pdf`)}>
                                    <Download className="h-4 w-4 mr-2" /> Download CV
                                </Button>
                            )}
                            {application.letter && (
                                <Button onClick={() => handleDownload(application.letter, `Letter_${application.full_name}.pdf`)}>
                                    <Download className="h-4 w-4 mr-2" /> Download Certifications
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
