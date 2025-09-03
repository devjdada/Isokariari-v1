import Tiptap from '@/components/editor/tiptap';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import type { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
}

interface Blog {
    id: number;
    title: string;
    slug: string;
    content: string;
    description: string;
    image: string;
    status: boolean;
    user_id: number;
    category_id: number;
    is_published: boolean;
    published_at: string | null;
    created_at: string;
    updated_at: string;
}

interface BlogFormData {
    _method: 'put';
    title: string;
    content: string;
    description: string;
    image: File | null;
    status: boolean;
    category_id: string;
    is_published: boolean;
    published_at: string;
}

export default function BlogEdit({ auth, blog, categories }: PageProps<{ blog: Blog; categories: Category[] }>) {
    const { data, setData, post, processing, errors, reset } = useForm<Omit<BlogFormData, 'slug'>>({
        _method: 'put',
        title: blog.title,
        content: blog.content,
        description: blog.description,
        image: null, // Image will be handled separately for updates
        status: blog.status,
        category_id: String(blog.category_id),
        is_published: blog.is_published,
        published_at: blog.published_at || '',
    });

    const imgUrl = `/storage/${blog.image}`;

    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(imgUrl || null);

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

        post(route('admin.blogs.update', blog.id), {
            onSuccess: () => {
                reset('image');
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Edit Blog</h2>}>
            <Head title="Edit Blog" />

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
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('description', e.target.value)}
                                    required
                                    rows={5}
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="content">Content</Label>
                                <Tiptap onChange={(e) => setData('content', e || '')} description={data.content || ''} />
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

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_published"
                                    checked={data.is_published}
                                    onCheckedChange={(checked) => setData('is_published', checked)}
                                />
                                <Label htmlFor="is_published">Published</Label>
                                <InputError message={errors.is_published} className="mt-2" />
                            </div>

                            {data.is_published && (
                                <div>
                                    <Label htmlFor="published_at">Published At</Label>
                                    <Input
                                        id="published_at"
                                        type="datetime-local"
                                        name="published_at"
                                        value={data.published_at}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('published_at', e.target.value)}
                                    />
                                    <InputError message={errors.published_at} className="mt-2" />
                                </div>
                            )}

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
