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
import { useEffect, useState } from 'react';

interface Client {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
}

interface ProjectFormData {
    title: string;
    description: string;
    doc: string;
    image: File | null;
    location: string;
    complete: string;
    slug: string;
    status: boolean;
    type: string;
    category: string;
    clientId: string;
    post_by: string;
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

export default function ProjectCreate({ auth, clients, users, categories }: PageProps<{ clients: Client[]; users: User[]; categories: Category[] }>) {
    const { data, setData, post, processing, errors, reset } = useForm<ProjectFormData>({
        title: '',
        description: '',
        doc: '',
        image: null,
        location: '',
        complete: '',
        slug: '',
        status: true,
        type: '',
        category: '',
        clientId: '',
        post_by: auth.user ? String(auth.user.id) : '',
    });

    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

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

        // Create FormData to handle file upload
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'image') {
                if (value instanceof File) {
                    formData.append(key, value);
                }
            } else if (key === 'status') {
                formData.append(key, value ? '1' : '0');
            } else if (key === 'category' || key === 'clientId') {
                formData.append(key, String(value)); // Send as string, backend exists rule handles it
            } else if (value !== null && value !== undefined) {
                formData.append(key, value as string | Blob);
            }
        });

        console.log('Data being sent:', Object.fromEntries(formData.entries()));

        post(route('admin.projects.store'), {
            data: formData,
            onSuccess: () => {
                reset();
                setImagePreviewUrl(null);
            },
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold">Create Project</h2>}>
            <Head title="Create Project" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden p-6 shadow-sm sm:rounded-lg">
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
                                <Label htmlFor="description">Project Details</Label>
                                <Tiptap onChange={(e) => setData('doc', e || '')} description={data.doc || ''} />
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
                                    required
                                />
                                <InputError message={errors.image} className="mt-2" />
                                {imagePreviewUrl && (
                                    <div className="mt-4">
                                        <img src={imagePreviewUrl} alt="Image Preview" className="h-auto max-w-xs rounded-md" />
                                    </div>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    type="text"
                                    name="location"
                                    value={data.location}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('location', e.target.value)}
                                />
                                <InputError message={errors.location} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="complete">Completion Status</Label>
                                <Select onValueChange={(value) => setData('complete', value)} value={data.complete}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select completion status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="on-going">On-going</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.complete} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="slug">Slug</Label>
                                <Input
                                    id="slug"
                                    type="text"
                                    name="slug"
                                    value={data.slug}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('slug', e.target.value)}
                                    required
                                />
                                <InputError message={errors.slug} className="mt-2" />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch id="status" checked={data.status} onCheckedChange={(checked) => setData('status', checked)} />
                                <Label htmlFor="status">Status (Active/Inactive)</Label>
                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="type">Type</Label>
                                <Select onValueChange={(value) => setData('type', value)} value={data.type}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="project">Project</SelectItem>
                                        <SelectItem value="case_study">Case Study</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.type} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="category">Category</Label>
                                <Select onValueChange={(value) => setData('category', value)} value={data.category}>
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
                                <InputError message={errors.category} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="clientId">Client</Label>
                                <Select onValueChange={(value) => setData('clientId', value)} value={data.clientId}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a client" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {clients.map((client) => (
                                            <SelectItem key={client.id} value={String(client.id)}>
                                                {client.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.clientId} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Project'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
