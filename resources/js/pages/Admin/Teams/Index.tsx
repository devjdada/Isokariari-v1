import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Pencil, PlusCircle, Trash2 } from 'lucide-react';

interface Team {
    id: number;
    name: string;
    facebook: string | null;
    twitter: string | null;
    linkedin: string | null;
    title: string | null;
    image: string | null;
    email: string;
    status: boolean;
    about: string | null;
    created_at: string;
    updated_at: string;
}

export default function TeamIndex({ auth, teams }: PageProps<{ teams: Team[] }>) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this team member?')) {
            router.delete(route('admin.teams.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Team Members</h2>}>
            <Head title="Team Members" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-4 flex justify-end">
                            <Link href={route('admin.teams.create')}>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Team Member
                                </Button>
                            </Link>
                        </div>

                        {teams.length > 0 ? (
                            <Table>
                                <TableCaption>A list of your team members.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {teams.map((team) => (
                                        <TableRow key={team.id}>
                                            <TableCell>{team.name}</TableCell>
                                            <TableCell>{team.title}</TableCell>
                                            <TableCell>{team.email}</TableCell>
                                            <TableCell>{team.status ? 'Active' : 'Inactive'}</TableCell>
                                            <TableCell className="flex items-center space-x-2">
                                                <Link href={route('admin.teams.show', team.id)}>
                                                    <Button variant="outline" size="icon" className="mr-2">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={route('admin.teams.edit', team.id)}>
                                                    <Button variant="outline" size="icon" className="mr-2">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="destructive" size="icon" onClick={() => handleDelete(team.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p>No team members found. Click "Add New Team Member" to add one.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
