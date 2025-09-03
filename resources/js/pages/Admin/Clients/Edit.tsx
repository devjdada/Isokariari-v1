import Tiptap from '@/components/editor/tiptap';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Client, PageProps } from '@/types';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function EditClientForm({ client, onSuccess }: PageProps<{ client: Client }> & { onSuccess: () => void }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: client.name || '',
        position: client.position || '',
        company: client.company || '',
        link: client.link || '',
        content: client.content || '',
        image: null as File | null,
    });

    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(client.image_url || null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setData('image', file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreviewUrl(client.image_url || null);
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.clients.update', client.id), {
            onSuccess: () => {
                reset();
                setImagePreviewUrl(client.image_url || null);
                onSuccess();
            },
        });
    };

    return (
        <form onSubmit={submit} className="mt-6 space-y-6">
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('name', e.target.value)}
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
                <Label htmlFor="link">Link</Label>
                <Input
                    id="link"
                    type="text"
                    name="link"
                    value={data.link}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('link', e.target.value)}
                />
                <InputError message={errors.link} className="mt-2" />
            </div>

            <div>
                <Label htmlFor="content">Content</Label>
                <Tiptap description={data.content} onChange={(newContent) => setData('content', newContent)} />
                <InputError message={errors.content} className="mt-2" />
            </div>

            <div>
                <Label htmlFor="image">Image</Label>
                <Input id="image" type="file" name="image" className="mt-1 block w-full" onChange={handleImageChange} />
                <InputError message={errors.image} className="mt-2" />
                {imagePreviewUrl && (
                    <div className="mt-4">
                        <img src={imagePreviewUrl} alt="Image Preview" className="h-auto max-w-xs" />
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4">
                <Button disabled={processing}>Update</Button>
            </div>
        </form>
    );
}
