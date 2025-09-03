import Tiptap from '@/components/editor/tiptap';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import type { PageProps } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface Category {
    id: number;
    name: string;
}

interface Service {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    status: boolean;
    category_id: number;
    post_by: number | null;
    edit_by: number | null;
    created_at: string;
    updated_at: string;
}

interface ServiceFormData {
    title: string;
    slug: string;
    description: string;
    image: File | null;
    status: boolean;
    category_id: string;
}

const slugify = (text: string) => {
    return text
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-');
};

export default function ServiceEdit({ auth, service, categories }: PageProps<{ service: Service; categories: Category[] }>) {
    const { data, setData, post, processing, errors, reset } = useForm<ServiceFormData>({
        title: service.title,
        slug: service.slug,
        description: service.description,
        image: null, // Image will be handled separately for updates
        status: service.status === '1', // Convert string '1'/'0' to boolean
        category_id: String(service.category_id),
    });

    const imgUrl = service.image ? `/storage/${service.image}` : null;
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(imgUrl);

    useEffect(() => {
        if (data.title) {
            setData('slug', slugify(data.title));
        }
    }, [data.title]);

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
            // Explicitly handle status conversion if it's a boolean in data
            if (key === 'status') {
                formData.append(key, value ? '1' : '0'); // Assuming data.status is boolean
            } else if (value !== null && value !== undefined) {
                formData.append(key, value as string | Blob);
            }
        });

        formData.append('_method', 'PUT'); // Use 'PUT' for consistency with ProjectEdit

        router.post(route('admin.services.update', service.id), formData, {
            onSuccess: () => {
                router.visit(route('admin.services.index'));
            },
            onError: (errors) => {
                console.error('Form submission errors:', errors);
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Edit Service</h2>}>
            <Head title="Edit Service" />

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
                                <Label htmlFor="description">Description</Label>
                                <Tiptap description={data.description} onChange={(newContent) => setData('description', newContent)} />
                                <InputError message={errors.description} className="mt-2" />
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

                            <div className="flex items-center space-x-2">
                                <Switch id="status" checked={data.status} onCheckedChange={(checked) => setData('status', checked)} />
                                <Label htmlFor="status">Status (Active/Inactive)</Label>
                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="category_id">Category</Label>
                                <Select onValueChange={(value) => setData('category_id', value)} value={data.category_id}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={String(category.id)}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.category_id} className="mt-2" />
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
