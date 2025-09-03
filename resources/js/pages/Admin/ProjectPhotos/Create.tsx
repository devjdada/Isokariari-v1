import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Project {
    id: number;
    title: string;
    slug: string;
}

interface ProjectPhotoFormData {
    image: FileList | null; // Changed to FileList
}

export default function ProjectPhotoCreate({ auth, project }: PageProps<{ project: Project }>) {
    const { data, setData, post, processing, errors, reset } = useForm<ProjectPhotoFormData>({
        image: null,
    });

    const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]); // Changed to array

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        setData('image', files);

        if (files && files.length > 0) {
            const urls: string[] = [];
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    urls.push(reader.result as string);
                    if (urls.length === files.length) {
                        setImagePreviewUrls(urls);
                    }
                };
                reader.readAsDataURL(files[i]);
            }
        } else {
            setImagePreviewUrls([]);
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

        // Append each file individually
        if (data.image) {
            for (let i = 0; i < data.image.length; i++) {
                formData.append('image[]', data.image[i]); // Append with [] for array in backend
            }
        }

        post(route('admin.projects.photos.store', project.id), {
            data: formData,
            onSuccess: () => {
                reset();
                setImagePreviewUrls([]); // Reset image previews
            },
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Add Photo for: {project.title}</h2>}
        >
            <Head title={`Add Photo for: ${project.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <Label htmlFor="image">Photo</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    name="image[]" // Changed name for multiple files
                                    className="mt-1 block w-full"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    multiple // Added multiple attribute
                                    required
                                />
                                <InputError message={errors.image} className="mt-2" />
                                {imagePreviewUrls.length > 0 && ( // Changed to check array length
                                    <div className="mt-4 grid grid-cols-3 gap-4">
                                        {' '}
                                        {/* Display multiple previews */}
                                        {imagePreviewUrls.map((url, index) => (
                                            <img key={index} src={url} alt={`Image Preview ${index + 1}`} className="h-auto max-w-xs rounded-md" />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Uploading...' : 'Upload Photo'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
