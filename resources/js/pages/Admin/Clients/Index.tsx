import { Button, buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { cn } from '@/lib/utils';
import type { Client, PageProps } from '@/types';
import CreateClientForm from './Create';
import EditClientForm from './Edit';

export default function Index({ auth, clients }: PageProps<{ clients: Client[] }>) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this client?')) {
            router.delete(route('admin.clients.destroy', id));
        }
    };

    const handleEditClick = (client: Client) => {
        setSelectedClient(client);
        setIsEditModalOpen(true);
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Clients</h2>}>
            <Head title="Clients" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card shadow-sm sm:rounded-lg">
                        <div className="p-6 text-white">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-lg font-medium">All Clients</h3>
                                <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                                    <DialogTrigger asChild>
                                        <Button className={cn(buttonVariants({ variant: 'default' }))}>Add New Client</Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
                                        <DialogHeader>
                                            <DialogTitle>Create New Client</DialogTitle>
                                            <DialogDescription>Fill in the details to create a new client.</DialogDescription>
                                        </DialogHeader>
                                        <CreateClientForm onSuccess={() => setIsCreateModalOpen(false)} />
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Company</TableHead>
                                        <TableHead>Position</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {clients.data.map((client) => (
                                        <TableRow key={client.id}>
                                            <TableCell>{client.name}</TableCell>
                                            <TableCell>{client.company}</TableCell>
                                            <TableCell>{client.position}</TableCell>
                                            <TableCell>
                                                <Link href={route('admin.clients.show', client.id)}>
                                                    <Button variant="ghost" size="icon" className="mr-2">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Dialog open={isEditModalOpen && selectedClient?.id === client.id} onOpenChange={setIsEditModalOpen}>
                                                    <DialogTrigger asChild>
                                                        <Button variant={'ghost'} onClick={() => handleEditClick(client)}>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
                                                        <DialogHeader>
                                                            <DialogTitle>Edit Client</DialogTitle>
                                                            <DialogDescription>Update the details of the client.</DialogDescription>
                                                        </DialogHeader>
                                                        {selectedClient && (
                                                            <EditClientForm client={selectedClient} onSuccess={() => setIsEditModalOpen(false)} />
                                                        )}
                                                    </DialogContent>
                                                </Dialog>
                                                <Link
                                                    href={route('admin.clients.destroy', client.id)}
                                                    method="delete"
                                                    as="button"
                                                    className={cn(buttonVariants({ variant: 'ghost' }))}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
