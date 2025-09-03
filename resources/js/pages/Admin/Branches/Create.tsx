import Tiptap from '@/components/editor/tiptap';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface BranchFormData {
    name: string;
    address: string;
    phone: string;
    email: string;
    lng: number | null;
    lat: number | null;
}

export default function BranchCreate({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm<BranchFormData>({
        name: '',
        address: '',
        phone: '',
        email: '',
        lng: null,
        lat: null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('admin.branches.store'), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Create Branch</h2>}>
            <Head title="Create Branch" />

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
                                <Label htmlFor="address">Address</Label>
                                <Tiptap description={data.address} onChange={(newContent) => setData('address', newContent)} />
                                <InputError message={errors.address} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    type="text"
                                    name="phone"
                                    value={data.phone}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('phone', e.target.value)}
                                    required
                                />
                                <InputError message={errors.phone} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="lng">Longitude</Label>
                                <Input
                                    id="lng"
                                    type="number"
                                    name="lng"
                                    value={data.lng || ''}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('lng', parseFloat(e.target.value) || null)}
                                />
                                <InputError message={errors.lng} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="lat">Latitude</Label>
                                <Input
                                    id="lat"
                                    type="number"
                                    name="lat"
                                    value={data.lat || ''}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('lat', parseFloat(e.target.value) || null)}
                                />
                                <InputError message={errors.lat} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Branch'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
