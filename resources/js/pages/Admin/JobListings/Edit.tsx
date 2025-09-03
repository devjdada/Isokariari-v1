import Tiptap from '@/components/editor/tiptap';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';

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

interface JobListingFormData {
    title: string;
    department: string;
    location: string;
    description: string;
    requirements: string;
    responsibilities: string;
    is_active: boolean;
    closing_date: string;
    posted_date: string;
}

export default function JobListingEdit({ auth, jobListing }: PageProps<{ jobListing: JobListing }>) {
    const { data, setData, processing, errors, reset } = useForm<JobListingFormData>({
        title: jobListing.title,
        department: jobListing.department,
        location: jobListing.location,
        description: jobListing.description,
        requirements: jobListing.requirements,
        responsibilities: jobListing.responsibilities,
        is_active: jobListing.is_active,
        closing_date: jobListing.closing_date || '',
        posted_date: jobListing.posted_date ? new Date(jobListing.posted_date).toISOString().split('T')[0] : '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'is_active') {
                // Handle is_active specifically
                formData.append(key, value ? '1' : '0'); // Convert boolean to '1' or '0' string
            } else if (value !== null && value !== undefined) {
                formData.append(key, value as string | Blob);
            }
        });

        formData.append('_method', 'PUT');

        router.post(route('admin.job-listings.update', jobListing.id), formData, {
            onSuccess: () => {
                router.visit(route('admin.job-listings.index'));
            },
            onError: (errors) => {
                console.error('Form submission errors:', errors);
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Edit Job Listing</h2>}>
            <Head title="Edit Job Listing" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    className="mt-1 block w-full"
                                    autoComplete="title"
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="department">Department</Label>
                                <Input
                                    id="department"
                                    type="text"
                                    name="department"
                                    value={data.department}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('department', e.target.value)}
                                    required
                                />
                                <InputError message={errors.department} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    type="text"
                                    name="location"
                                    value={data.location}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('location', e.target.value)}
                                    required
                                />
                                <InputError message={errors.location} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Tiptap description={data.description} onChange={(newContent) => setData('description', newContent)} />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="requirements">Requirements</Label>
                                <Tiptap description={data.requirements} onChange={(newContent) => setData('requirements', newContent)} />
                                <InputError message={errors.requirements} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="responsibilities">Responsibilities</Label>
                                <Tiptap description={data.responsibilities} onChange={(newContent) => setData('responsibilities', newContent)} />
                                <InputError message={errors.responsibilities} className="mt-2" />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch id="is_active" checked={data.is_active} onCheckedChange={(checked) => setData('is_active', checked)} />
                                <Label htmlFor="is_active">Active</Label>
                                <InputError message={errors.is_active} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="closing_date">Closing Date</Label>
                                <Input
                                    id="closing_date"
                                    type="date"
                                    name="closing_date"
                                    value={data.closing_date}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('closing_date', e.target.value)}
                                />
                                <InputError message={errors.closing_date} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="posted_date">Posted Date</Label>
                                <Input
                                    id="posted_date"
                                    type="date"
                                    name="posted_date"
                                    value={data.posted_date}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('posted_date', e.target.value)}
                                    required
                                />
                                <InputError message={errors.posted_date} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
