import Tiptap from '@/components/editor/tiptap'; // Added
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Added
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import type { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react'; // Added for image preview

interface Project {
    id: number;
    title: string;
    slug: string;
}

interface MoreProject {
    id: number;
    project_id: number;
    doc: string;
    image: string;
    position: 'left' | 'right';
    created_at: string;
    updated_at: string;
}

interface MoreProjectFormData {
    _method: 'put';
    doc: string;
    image: File | null;
    position: 'left' | 'right';
}

export default function MoreProjectEdit({ auth, project, moreProject }: PageProps<{ project: Project; moreProject: MoreProject }>) {
    const { data, setData, post, processing, errors, reset } = useForm<MoreProjectFormData>({
        _method: 'put',
        doc: moreProject.doc,
        image: null, // Image will be handled separately for updates
        position: moreProject.position,
    });
    const imgUrl = `/storage/${moreProject.image}`; // Assuming the image is stored in public/storage
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(imgUrl); // Added for image preview

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreviewUrl(imgUrl);
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(
            route('admin.projects.more-projects.update', {
                project: project.id,
                more_project: moreProject.id,
            }),
            {
                onSuccess: () => {
                    reset('image');
                },
            },
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Edit More Details for: {project.title}</h2>}
        >
            <Head title={`Edit More Details for: ${project.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <Label htmlFor="doc">Details Content</Label>
                                <Tiptap onChange={(e) => setData('doc', e || '')} description={data.doc || ''} />
                                <InputError message={errors.doc} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="image">Image</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    name="image"
                                    className="mt-1 block w-full"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                                <InputError message={errors.image} className="mt-2" />
                                {imagePreviewUrl && (
                                    <div className="mt-4">
                                        <img src={imagePreviewUrl} alt="Image Preview" className="h-auto max-w-xs rounded-md" />
                                    </div>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="position">Position</Label>
                                <Select onValueChange={(value: 'left' | 'right') => setData('position', value)} value={data.position}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select position" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="left">Left</SelectItem>
                                        <SelectItem value="right">Right</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.position} className="mt-2" />
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
