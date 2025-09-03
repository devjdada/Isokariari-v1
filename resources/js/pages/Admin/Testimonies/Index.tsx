import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Pencil, PlusCircle, Trash2 } from 'lucide-react';

interface Testimony {
    id: number;
    name: string;
    position: string | null;
    company: string | null;
    content: string;
    image: string | null;
    created_at: string;
    updated_at: string;
}

export default function TestimonyIndex({ auth, testimonies }: PageProps<{ testimonies: Testimony[] }>) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this testimony?')) {
            router.delete(route('admin.testimonies.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Testimonies</h2>}>
            <Head title="Testimonies" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-4 flex justify-end">
                            <Link href={route('admin.testimonies.create')}>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Testimony
                                </Button>
                            </Link>
                        </div>

                        {testimonies.length > 0 ? (
                            <Table>
                                <TableCaption>A list of your testimonies.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Position</TableHead>
                                        <TableHead>Company</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {testimonies.map((testimony) => (
                                        <TableRow key={testimony.id}>
                                            <TableCell>{testimony.name}</TableCell>
                                            <TableCell>{testimony.position}</TableCell>
                                            <TableCell>{testimony.company}</TableCell>
                                            <TableCell className="flex items-center space-x-2">
                                                <Link href={route('admin.testimonies.show', testimony.id)}>
                                                    <Button variant="outline" size="icon" className="mr-2">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={route('admin.testimonies.edit', testimony.id)}>
                                                    <Button variant="outline" size="icon" className="mr-2">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="destructive" size="icon" onClick={() => handleDelete(testimony.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p>No testimonies found. Click "Create New Testimony" to add one.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
