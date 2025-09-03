import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface ServicePhoto {
    id: number;
    serviceId: number;
    image: string;
    created_at: string;
    updated_at: string;
}

interface Service {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    status: string;
    category_id: number;
}

export default function ServicePhotosIndex({ auth, service, servicePhotos }: PageProps<{ service: Service; servicePhotos: ServicePhoto[] }>) {
    const { data, setData, post, processing, errors, reset } = useForm({
        images: [] as File[],
    });

    const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setData('images', files);

        if (files.length > 0) {
            const urls: string[] = [];
            files.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    urls.push(reader.result as string);
                    if (urls.length === files.length) {
                        setImagePreviewUrls(urls);
                    }
                };
                reader.readAsDataURL(file);
            });
        } else {
            setImagePreviewUrls([]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.services.photos.store', service.id), {
            onSuccess: () => {
                reset();
                setImagePreviewUrls([]);
            },
        });
    };

    const handleDelete = (photoId: number) => {
        if (confirm('Are you sure you want to delete this photo?')) {
            router.delete(route('admin.services.photos.destroy', { service: service.id, photo: photoId }));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Photos for Service: {service.title}</h2>}
        >
            <Head title={`Photos for ${service.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <h3 className="mb-4 text-lg font-medium">Upload New Photo</h3>
                        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                            <div>
                                <Label htmlFor="image">Image</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    name="image"
                                    className="mt-1 block w-full"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    multiple
                                />
                                <InputError message={errors.image} className="mt-2" />
                                {imagePreviewUrls.length > 0 && (
                                    <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                        {imagePreviewUrls.map((url, index) => (
                                            <img key={index} src={url} alt="Image Preview" className="h-32 w-full rounded-md object-cover" />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={processing}>
                                    <PlusCircle className="mr-2 h-4 w-4" /> {processing ? 'Uploading...' : 'Upload Photo'}
                                </Button>
                            </div>
                        </form>

                        <h3 className="mt-8 mb-4 text-lg font-medium">Existing Photos</h3>
                        {servicePhotos.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                {servicePhotos.map((photo) => (
                                    <div key={photo.id} className="group relative">
                                        <img src={`/storage/${photo.image}`} alt="Service Photo" className="h-32 w-full rounded-md object-cover" />
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
                                            onClick={() => handleDelete(photo.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No photos found for this service.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
