import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Blog {
    id: number;
    title: string;
}

interface BlogPhotoFormData {
    images: File[] | null;
}

export default function BlogPhotoCreate({ auth, blog }: PageProps<{ blog: Blog }>) {
    const { data, setData, post, processing, errors, reset } = useForm<BlogPhotoFormData>({
        images: null,
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

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('admin.blogs.photos.store', blog.id), {
            onSuccess: () => {
                reset();
                setImagePreviewUrls([]);
            },
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Upload Photos for {blog.title}</h2>}
        >
            <Head title={`Upload Photos for ${blog.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <Label htmlFor="images">Images</Label>
                                <Input
                                    id="images"
                                    type="file"
                                    name="images[]"
                                    className="mt-1 block w-full"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    multiple
                                    required
                                />
                                <InputError message={errors.images} className="mt-2" />
                                {imagePreviewUrls.length > 0 && (
                                    <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                        {imagePreviewUrls.map((url, index) => (
                                            <img key={index} src={url} alt={`Image Preview ${index + 1}`} className="h-auto max-w-full rounded-md" />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Uploading...' : 'Upload Photos'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
