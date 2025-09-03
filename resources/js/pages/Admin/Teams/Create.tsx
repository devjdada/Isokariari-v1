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

interface TeamFormData {
    name: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    title: string;
    image: File | null;
    email: string;
    status: boolean;
    about: string;
    order: number;
}

export default function TeamCreate({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm<TeamFormData>({
        name: '',
        facebook: '',
        twitter: '',
        linkedin: '',
        title: '',
        image: null,
        email: '',
        status: false,
        about: '',
        order: 0,
    });

    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

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

        post(route('admin.teams.store'), {
            onSuccess: () => {
                reset();
                setImagePreviewUrl(null);
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Create Team Member</h2>}>
            <Head title="Create Team Member" />

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
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="email"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="title">Title/Position</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('title', e.target.value)}
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="order">Order</Label>
                                <Input
                                    id="order"
                                    type="number"
                                    name="order"
                                    value={data.order}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('order', parseInt(e.target.value))}
                                />
                                <InputError message={errors.order} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="facebook">Facebook URL</Label>
                                <Input
                                    id="facebook"
                                    type="url"
                                    name="facebook"
                                    value={data.facebook}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('facebook', e.target.value)}
                                />
                                <InputError message={errors.facebook} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="twitter">Twitter URL</Label>
                                <Input
                                    id="twitter"
                                    type="url"
                                    name="twitter"
                                    value={data.twitter}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('twitter', e.target.value)}
                                />
                                <InputError message={errors.twitter} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="linkedin">LinkedIn URL</Label>
                                <Input
                                    id="linkedin"
                                    type="url"
                                    name="linkedin"
                                    value={data.linkedin}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('linkedin', e.target.value)}
                                />
                                <InputError message={errors.linkedin} className="mt-2" />
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
                                <Label htmlFor="about">About (Bio)</Label>
                                <Tiptap description={data.about} onChange={(newContent) => setData('about', newContent)} />
                                <InputError message={errors.about} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Team Member'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
