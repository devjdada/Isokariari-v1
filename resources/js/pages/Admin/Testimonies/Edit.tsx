import Tiptap from '@/components/editor/tiptap';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Testimony {
    id: number;
    name: string;
    position: string | null;
    company: string | null;
    content: string;
    image: string | null;
    created_at: string;
    updated_at: string;
}

interface TestimonyFormData {
    name: string;
    position: string;
    company: string;
    content: string;
    image: File | null;
}

export default function TestimonyEdit({ auth, testimony }: PageProps<{ testimony: Testimony }>) {
    const { data, setData, processing, errors, reset } = useForm<TestimonyFormData>({
        name: testimony.name,
        position: testimony.position || '',
        company: testimony.company || '',
        content: testimony.content,
        image: null, // Image will be handled separately for updates
    });

    const imgUrl = testimony.image ? `/storage/${testimony.image}` : null;
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(imgUrl);

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
            setImagePreviewUrl(null);
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'image' && value === null) {
                // Don't append image if it's null (no new image selected)
                return;
            }
            if (value !== null && value !== undefined) {
                formData.append(key, value as string | Blob);
            }
        });

        formData.append('_method', 'PUT');

        router.post(route('admin.testimonies.update', testimony.id), formData, {
            onSuccess: () => {
                router.visit(route('admin.testimonies.index'));
            },
            onError: (errors) => {
                console.error('Form submission errors:', errors);
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Edit Testimony</h2>}>
            <Head title="Edit Testimony" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="position">Position</Label>
                                <Input
                                    id="position"
                                    type="text"
                                    name="position"
                                    value={data.position}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('position', e.target.value)}
                                />
                                <InputError message={errors.position} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="company">Company</Label>
                                <Input
                                    id="company"
                                    type="text"
                                    name="company"
                                    value={data.company}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('company', e.target.value)}
                                />
                                <InputError message={errors.company} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="content">Content</Label>
                                <Tiptap description={data.content} onChange={(newContent) => setData('content', newContent)} />
                                <InputError message={errors.content} className="mt-2" />
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
