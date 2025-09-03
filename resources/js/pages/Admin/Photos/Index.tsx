import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Photo {
    id: number;
    gallery: string | null;
    image: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

export default function PhotoIndex({ auth, photos }: PageProps<{ photos: Photo[] }>) {
    const { data, setData, post, processing, errors, reset } = useForm({
        gallery: '',
        images: [] as File[], // Changed to array of File
        description: '',
    });

    const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]); // Changed to array of strings

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []); // Get all selected files
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
        post(route('admin.photos.store'), {
            onSuccess: () => {
                reset();
                setImagePreviewUrls([]);
            },
            forceFormData: true, // Important for file uploads
        });
    };

    const handleDelete = (photoId: number) => {
        if (confirm('Are you sure you want to delete this photo?')) {
            router.delete(route('admin.photos.destroy', photoId));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Manage Photos</h2>}
        >
            <Head title="Manage Photos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <h3 className="mb-4 text-lg font-medium">Upload New Photo</h3>
                        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                            <div>
                                <Label htmlFor="gallery">Gallery (Optional)</Label>
                                <Select
                                    value={data.gallery || ''}
                                    onValueChange={(value) => setData('gallery', value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a gallery" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="careers">Careers</SelectItem>
                                        <SelectItem value="history">History</SelectItem>
                                        <SelectItem value="others">Others</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.gallery} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="description">Description (Optional)</Label>
                                <Input
                                    id="description"
                                    type="text"
                                    name="description"
                                    value={data.description || ''}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="image">Images</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    name="images[]" // Changed name to array for multiple files
                                    className="mt-1 block w-full"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    multiple // Added multiple attribute
                                />
                                <InputError message={errors.images} className="mt-2" />
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
                        {photos.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                {photos.map((photo) => (
                                    <div key={photo.id} className="group relative">
                                        <img src={photo.image} alt={photo.description || 'Photo'} className="h-32 w-full rounded-md object-cover" />
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
                            <p>No photos found.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
