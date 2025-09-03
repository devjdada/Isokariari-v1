import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Trash2 } from 'lucide-react'; // Import Trash2 icon
import { useState } from 'react';

interface Project {
    id: number;
    title: string;
    slug: string;
}

interface ProjectPhoto {
    id: number;
    project_id: number;
    image: string;
    caption: string | null;
    created_at: string;
    updated_at: string;
}

interface ProjectPhotoFormData {
    new_photos: FileList | null;
    // We won't send existing photos directly in formData for update,
    // but manage their deletion/caption updates separately.
    // For simplicity, we'll only handle new photos and deletions here.
}

export default function ProjectPhotoEdit({ auth, project, projectPhotos }: PageProps<{ project: Project; projectPhotos: ProjectPhoto[] }>) {
    const { data, setData, post, processing, errors, reset } = useForm<ProjectPhotoFormData>({
        new_photos: null,
    });

    const [existingPhotos, setExistingPhotos] = useState<ProjectPhoto[]>(projectPhotos);
    const [newImagePreviewUrls, setNewImagePreviewUrls] = useState<string[]>([]);

    const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        setData('new_photos', files);

        if (files && files.length > 0) {
            const urls: string[] = [];
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    urls.push(reader.result as string);
                    if (urls.length === files.length) {
                        setNewImagePreviewUrls(urls);
                    }
                };
                reader.readAsDataURL(files[i]);
            }
        } else {
            setNewImagePreviewUrls([]);
        }
    };

    const handleRemoveExistingPhoto = (photoId: number) => {
        if (confirm('Are you sure you want to remove this photo?')) {
            // This will trigger a separate DELETE request to the backend
            // for simplicity, we'll just remove it from the local state for now
            // and rely on the backend to handle the actual deletion.
            // In a real application, you'd send an AJAX request here.
            setExistingPhotos(existingPhotos.filter((photo) => photo.id !== photoId));
            // You would typically send a router.delete request here
            // router.delete(route('admin.projects.photos.destroy', { project: project.id, photo: photoId }));
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

        // Append new photos
        if (data.new_photos) {
            for (let i = 0; i < data.new_photos.length; i++) {
                formData.append('new_photos[]', data.new_photos[i]);
            }
        }

        // For PUT requests with FormData, you might need to manually append _method
        formData.append('_method', 'put');

        // Send the IDs of photos to be deleted (if any)
        const deletedPhotoIds = projectPhotos.filter((p) => !existingPhotos.some((ep) => ep.id === p.id)).map((p) => p.id);
        if (deletedPhotoIds.length > 0) {
            formData.append('deleted_photo_ids', JSON.stringify(deletedPhotoIds));
        }

        post(route('admin.projects.photos.update', project.id), {
            // project.id is the only parameter needed for the route
            data: formData,
            onSuccess: () => {
                // On success, you might want to redirect back to the index or refresh the page
                // For now, we'll just reset the new photo input
                reset();
                setNewImagePreviewUrls([]);
            },
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Manage Photos for: {project.title}</h2>}
        >
            <Head title={`Manage Photos for: ${project.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="mt-6 space-y-6">
                            {/* Existing Photos Section */}
                            {existingPhotos.length > 0 && (
                                <div>
                                    <Label>Existing Photos</Label>
                                    <div className="mt-4 grid grid-cols-3 gap-4">
                                        {existingPhotos.map((p) => (
                                            <div key={p.id} className="relative">
                                                <img
                                                    src={p.image}
                                                    alt={p.caption || 'Project Photo'}
                                                    className="h-32 w-full rounded-md object-cover"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute top-1 right-1 h-6 w-6"
                                                    onClick={() => handleRemoveExistingPhoto(p.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Add New Photos Section */}
                            <div>
                                <Label htmlFor="new_photos">Add New Photos</Label>
                                <Input
                                    id="new_photos"
                                    type="file"
                                    name="new_photos[]"
                                    className="mt-1 block w-full"
                                    onChange={handleNewImageChange}
                                    accept="image/*"
                                    multiple
                                />
                                <InputError message={errors.new_photos} className="mt-2" />
                                {newImagePreviewUrls.length > 0 && (
                                    <div className="mt-4 grid grid-cols-3 gap-4">
                                        {newImagePreviewUrls.map((url, index) => (
                                            <img
                                                key={index}
                                                src={url}
                                                alt={`New Image Preview ${index + 1}`}
                                                className="h-auto max-w-xs rounded-md"
                                            />
                                        ))}
                                    </div>
                                )}
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
