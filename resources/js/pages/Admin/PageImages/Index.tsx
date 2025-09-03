import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface PageImage {
    id: number;
    pageId: number;
    image: string;
    created_at: string;
    updated_at: string;
}

interface Page {
    id: number;
    page_title: string;
    page_contents: string;
    page_image: string | null;
    page_slug: string;
    page_more: string | null;
}

export default function PageImagesIndex({ auth, page, pageImages }: PageProps<{ page: Page; pageImages: PageImage[] }>) {
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
        post(route('admin.pages.images.store', page.id), {
            onSuccess: () => {
                reset();
                setImagePreviewUrls([]);
            },
        });
    };

    const handleDelete = (imageId: number) => {
        if (confirm('Are you sure you want to delete this image?')) {
            router.delete(route('admin.pages.images.destroy', { page: page.id, image: imageId }));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Images for Page: {page.page_title}</h2>}
        >
            <Head title={`Images for ${page.page_title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <h3 className="mb-4 text-lg font-medium">Upload New Images</h3>
                        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                            <div>
                                <Label htmlFor="images">Images</Label>
                                <Input
                                    id="images"
                                    type="file"
                                    name="images"
                                    className="mt-1 block w-full"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    multiple
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
                                    <PlusCircle className="mr-2 h-4 w-4" /> {processing ? 'Uploading...' : 'Upload Images'}
                                </Button>
                            </div>
                        </form>

                        <h3 className="mt-8 mb-4 text-lg font-medium">Existing Images</h3>
                        {pageImages.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                {pageImages.map((image) => (
                                    <div key={image.id} className="group relative">
                                        <img src={`/storage/${image.image}`} alt="Page Image" className="h-32 w-full rounded-md object-cover" />
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
                                            onClick={() => handleDelete(image.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No images found for this page.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
