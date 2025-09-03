import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { truncate } from '@/lib/utils'; // New import
import { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';

interface Project {
    id: number;
    title: string;
    slug: string;
}

interface MoreProject {
    id: number;
    project_id: number;
    doc: string;
    image: string;
    position: 'left' | 'right';
    created_at: string;
    updated_at: string;
}

export default function MoreProjectIndex({ auth, project, moreProjects }: PageProps<{ project: Project; moreProjects: MoreProject[] }>) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete these more project details?')) {
            router.delete(route('admin.projects.more-projects.destroy', { project: project.id, more_project: id }));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl leading-tight font-semibold text-gray-800">More Project Details for: {project.title}</h2>}
        >
            <Head title={`More Project Details for: ${project.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-4 flex justify-end">
                            <Link href={route('admin.projects.more-projects.create', project.id)}>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add More Details
                                </Button>
                            </Link>
                        </div>

                        {moreProjects && moreProjects.length > 0 ? (
                            <Table>
                                <TableCaption>Additional details for {project.title}.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Doc</TableHead>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Position</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {moreProjects.map((moreProject) => (
                                        <TableRow key={moreProject.id}>
                                            <TableCell>{truncate(moreProject.doc, 30)}</TableCell>
                                            <TableCell>
                                                {moreProject.image && (
                                                    <img
                                                        src={`/storage/${moreProject.image}`}
                                                        alt="More Project Image"
                                                        className="h-10 w-10 rounded-md object-cover"
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell>{moreProject.position}</TableCell>
                                            <TableCell>
                                                <Link
                                                    href={route('admin.projects.more-projects.edit', {
                                                        project: project.id,
                                                        more_project: moreProject.id,
                                                    })}
                                                >
                                                    <Button variant="outline" size="icon" className="mr-2">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="destructive" size="icon" onClick={() => handleDelete(moreProject.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p>No additional details found for this project. Click "Add More Details" to create one.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
