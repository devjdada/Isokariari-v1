import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageProps } from '@/types';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

interface Category {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
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

export default function EditCategoryForm({ category, onSuccess }: PageProps<{ category: Category }> & { onSuccess: () => void }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: category.name,
        slug: category.slug,
    });

    useEffect(() => {
        if (data.name && data.name !== category.name) {
            setData('slug', slugify(data.name));
        }
    }, [data.name]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.categories.update', category.id), {
            onSuccess: () => {
                reset();
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
                    autoComplete="name"
                    onChange={(e) => setData('name', e.target.value)}
                    required
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="flex items-center gap-4">
                <Button disabled={processing}>Save Changes</Button>
            </div>
        </form>
    );
}
