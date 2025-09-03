import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import type { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Pencil, PlusCircle, Trash2 } from 'lucide-react';

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

export default function JobListingIndex({ auth, jobListings }: PageProps<{ jobListings: JobListing[] }>) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this job listing?')) {
            router.delete(route('admin.job-listings.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Job Listings</h2>}>
            <Head title="Job Listings" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-4 flex justify-end">
                            <Link href={route('admin.job-listings.create')}>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Job Listing
                                </Button>
                            </Link>
                        </div>

                        {jobListings.length > 0 ? (
                            <Table>
                                <TableCaption>A list of your job listings.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Department</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Active</TableHead>
                                        <TableHead>Closing Date</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {jobListings.map((jobListing) => (
                                        <TableRow key={jobListing.id}>
                                            <TableCell>{jobListing.title}</TableCell>
                                            <TableCell>{jobListing.department}</TableCell>
                                            <TableCell>{jobListing.location}</TableCell>
                                            <TableCell>{jobListing.is_active ? 'Yes' : 'No'}</TableCell>
                                            <TableCell>
                                                {jobListing.closing_date ? new Date(jobListing.closing_date).toLocaleDateString() : 'N/A'}
                                            </TableCell>
                                            <TableCell className="flex items-center space-x-2">
                                                <Link href={route('admin.job-listings.show', jobListing.id)}>
                                                    <Button variant="outline" size="icon" className="mr-2">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={route('admin.job-listings.edit', jobListing.id)}>
                                                    <Button variant="outline" size="icon" className="mr-2">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="destructive" size="icon" onClick={() => handleDelete(jobListing.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p>No job listings found. Click "Create New Job Listing" to add one.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
