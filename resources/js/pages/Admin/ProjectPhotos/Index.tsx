import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import type { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';

interface Category {
    id: number;
    name: string;
}

interface Project {
    id: number;
    title: string;
    slug: string;
    category: Category;
    more_projects_count: number;
    project_photos_count: number;
}

interface ProjectPhoto {
    id: number;
    project_id: number;
    image: string;
    caption: string | null;
    created_at: string;
    updated_at: string;
}

export default function ProjectPhotoIndex({ auth, project, projectPhotos }: PageProps<{ project: Project; projectPhotos: ProjectPhoto[] }>) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this project photo?')) {
            router.delete(
                route('admin.projects.photos.destroy', {
                    project: project.id,
                    photo: id,
                }),
            );
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl leading-tight font-semibold text-gray-800">
                    Project Photos for: {project.title}
                    <span className="ml-2 text-sm text-gray-500">({project.category.name})</span>
                    <span className="ml-2 text-sm text-gray-500">Photos: {project.project_photos_count}</span>
                    <span className="ml-2 text-sm text-gray-500">More Projects: {project.more_projects_count}</span>
                </h2>
            }
        >
            <Head title={`Project Photos for: ${project.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-4 flex justify-end">
                            <Link href={route('admin.projects.photos.create', project.id)}>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add Photo
                                </Button>
                            </Link>
                        </div>

                        {projectPhotos && projectPhotos.length > 0 ? (
                            <Table>
                                <TableCaption>Photos for {project.title}.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Photo</TableHead>
                                        <TableHead>Caption</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {projectPhotos.map((photo) => (
                                        <TableRow key={photo.id}>
                                            <TableCell>
                                                {photo.image && (
                                                    <img
                                                        src={`/storage/${photo.image}`}
                                                        alt={photo.caption || 'Project Photo'}
                                                        className="h-auto max-w-xs rounded-md"
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell>{photo.caption || 'N/A'}</TableCell>
                                            <TableCell>
                                                <Link
                                                    href={route('admin.projects.photos.edit', {
                                                        project: project.id,
                                                        photo: photo.id,
                                                    })}
                                                >
                                                    <Button variant="outline" size="icon" className="mr-2">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="destructive" size="icon" onClick={() => handleDelete(photo.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p>No photos found for this project. Click "Add Photo" to upload one.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
