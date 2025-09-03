import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Pencil, PlusCircle, Trash2 } from 'lucide-react';

interface Equipment {
    id: number;
    name: string;
    position: string | null;
    company: string | null;
    link: string | null;
    content: string | null;
    image: string | null;
    created_at: string;
    updated_at: string;
}

export default function EquipmentIndex({ auth, equipments }: PageProps<{ equipments: Equipment[] }>) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this equipment?')) {
            router.delete(route('admin.equipment.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Equipment</h2>}>
            <Head title="Equipment" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-4 flex justify-end">
                            <Link href={route('admin.equipment.create')}>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Equipment
                                </Button>
                            </Link>
                        </div>

                        {equipments.length > 0 ? (
                            <Table>
                                <TableCaption>A list of your equipment.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Company</TableHead>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {equipments.map((equipment) => (
                                        <TableRow key={equipment.id}>
                                            <TableCell>{equipment.name}</TableCell>
                                            <TableCell>{equipment.company}</TableCell>
                                            <TableCell>
                                                {equipment.image && (
                                                    <img
                                                        src={`/storage/${equipment.image}`}
                                                        alt={equipment.name}
                                                        className="h-16 w-16 rounded-md object-cover"
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell className="flex items-center space-x-2">
                                                <Link href={route('admin.equipment.show', equipment.id)}>
                                                    <Button variant="outline" size="icon" className="mr-2">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={route('admin.equipment.edit', equipment.id)}>
                                                    <Button variant="outline" size="icon" className="mr-2">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="destructive" size="icon" onClick={() => handleDelete(equipment.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p>No equipment found. Click "Create New Equipment" to add one.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
