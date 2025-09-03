import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import type { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Camera, Pencil, PlusCircle, Trash2 } from 'lucide-react';

interface Service {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    status: string;
    category_id: number;
    post_by: number | null;
    edit_by: number | null;
    created_at: string;
    updated_at: string;
    category: {
        // Assuming eager loaded category
        id: number;
        name: string;
    };
}

export default function ServiceIndex({ auth, services }: PageProps<{ services: Service[] }>) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this service?')) {
            router.delete(route('admin.services.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Services</h2>}>
            <Head title="Services" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-4 flex justify-end">
                            <Link href={route('admin.services.create')}>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Service
                                </Button>
                            </Link>
                        </div>

                        {services.length > 0 ? (
                            <Table>
                                <TableCaption>A list of your services.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {services.map((service) => (
                                        <TableRow key={service.id}>
                                            <TableCell>{service.title}</TableCell>
                                            <TableCell>
                                                {service.image && (
                                                    <img
                                                        src={`/storage/${service.image}`}
                                                        alt={service.title}
                                                        className="h-16 w-16 rounded-md object-cover"
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell>{service.category.name}</TableCell>
                                            <TableCell>{service.status === '1' ? 'Active' : 'Inactive'}</TableCell>
                                            <TableCell>
                                                <Link href={route('admin.services.edit', service.id)}>
                                                    <Button variant="outline" size="icon" className="mr-2">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={route('admin.services.photos.index', service.id)}>
                                                    <Button variant="outline" size="icon" className="mr-2">
                                                        <Camera className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="destructive" size="icon" onClick={() => handleDelete(service.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p>No services found. Click "Create New Service" to add one.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
