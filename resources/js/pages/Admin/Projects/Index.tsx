import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { truncate } from '@/lib/utils';
import type { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, ImagePlus, ListPlus, Pencil, Trash2 } from 'lucide-react';

interface Client {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
}

interface Project {
    id: number;
    title: string;
    description: string;
    doc: string;
    image: string;
    link: string | null;
    location: string | null;
    complete: string | null;
    slug: string;
    status: boolean;
    type: string;
    category: Category;
    clientId: number | null;
    post_by: number | null;
    edit_by: number | null;
    created_at: string;
    updated_at: string;
    more_projects_count: number;
    project_photos_count: number;
}

export default function ProjectIndex({
    auth,
    projects,
    clients,
    users,
    categories,
}: PageProps<{ projects: Project[]; clients: Client[]; users: User[]; categories: Category[] }>) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this project?')) {
            router.delete(route('admin.projects.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold">Projects</h2>}>
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-4 flex justify-end">
                            <Link href={route('admin.projects.create')}>
                                <Button>Create New Project</Button>
                            </Link>
                        </div>

                        <Table>
                            <TableCaption>A list of your projects.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Category</TableHead>

                                    <TableHead>Status</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead></TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {projects.map((project) => (
                                    <TableRow key={project.id}>
                                        <TableCell>{truncate(project.title, 50)}</TableCell>
                                        <TableCell>{project.category.name}</TableCell>

                                        <TableCell>{project.status ? 'Active' : 'Inactive'}</TableCell>
                                        <TableCell>{project.type}</TableCell>

                                        <TableCell>
                                            <p className="mb-2 text-xs text-gray-500">
                                                {project.project_photos_count}-photos {project.more_projects_count}-docs
                                            </p>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={route('admin.projects.show', project.id)}>
                                                <Button variant="outline" size="icon" className="mr-2">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link href={route('admin.projects.photos.index', project.id)}>
                                                <Button variant="outline" size="icon" className="mr-2">
                                                    <ImagePlus className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link href={route('admin.projects.more-projects.index', project.id)}>
                                                <Button variant="outline" size="icon" className="mr-2">
                                                    <ListPlus className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link href={route('admin.projects.edit', project.id)}>
                                                <Button variant="outline" size="icon" className="mr-2">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button variant="destructive" size="icon" onClick={() => handleDelete(project.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
