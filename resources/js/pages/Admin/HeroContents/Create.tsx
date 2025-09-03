import Tiptap from '@/components/editor/tiptap';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface HeroContentFormData {
    title: string;
    subtitle: string;
    description: string;
    image_path: File | null;
    button_text: string;
    button_link: string;
    is_active: boolean;
}

export default function HeroContentCreate({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm<HeroContentFormData>({
        title: '',
        subtitle: '',
        description: '',
        image_path: null,
        button_text: '',
        button_link: '',
        is_active: true,
    });

    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image_path', file);

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

        post(route('admin.hero-contents.store'), {
            onSuccess: () => {
                reset();
                setImagePreviewUrl(null);
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Create Hero Content</h2>}>
            <Head title="Create Hero Content" />

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
                                <Label htmlFor="subtitle">Subtitle</Label>
                                <Input
                                    id="subtitle"
                                    type="text"
                                    name="subtitle"
                                    value={data.subtitle}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('subtitle', e.target.value)}
                                />
                                <InputError message={errors.subtitle} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Tiptap description={data.description} onChange={(newContent) => setData('description', newContent)} />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="image_path">Image</Label>
                                <Input
                                    id="image_path"
                                    type="file"
                                    name="image_path"
                                    className="mt-1 block w-full"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                                <InputError message={errors.image_path} className="mt-2" />
                                {imagePreviewUrl && (
                                    <div className="mt-4">
                                        <img src={imagePreviewUrl} alt="Image Preview" className="h-auto max-w-xs rounded-md" />
                                    </div>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="button_text">Button Text</Label>
                                <Input
                                    id="button_text"
                                    type="text"
                                    name="button_text"
                                    value={data.button_text}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('button_text', e.target.value)}
                                />
                                <InputError message={errors.button_text} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="button_link">Button Link</Label>
                                <Input
                                    id="button_link"
                                    type="url"
                                    name="button_link"
                                    value={data.button_link}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('button_link', e.target.value)}
                                />
                                <InputError message={errors.button_link} className="mt-2" />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch id="is_active" checked={data.is_active} onCheckedChange={(checked) => setData('is_active', checked)} />
                                <Label htmlFor="is_active">Active</Label>
                                <InputError message={errors.is_active} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Hero Content'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
