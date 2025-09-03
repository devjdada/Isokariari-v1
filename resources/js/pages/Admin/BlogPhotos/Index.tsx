import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { PlusCircle, Trash2 } from 'lucide-react';

interface BlogPhoto {
    id: number;
    blogId: number;
    image: string;
    created_at: string;
    updated_at: string;
}

interface Blog {
    id: number;
    title: string;
    blog_photos: BlogPhoto[];
}

export default function BlogPhotosIndex({ auth, blog }: PageProps<{ blog: Blog }>) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this photo?')) {
            router.delete(route('admin.blog_photos.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl leading-tight font-semibold text-gray-800">
                    Photos for {blog.title} ({blog.blog_photos.length})
                </h2>
            }
        >
            <Head title={`Photos for ${blog.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-4 flex justify-end">
                            <Link href={route('admin.blogs.photos.create', blog.id)}>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Photo
                                </Button>
                            </Link>
                        </div>

                        {blog.blog_photos.length > 0 ? (
                            <Table>
                                <TableCaption>A list of photos for {blog.title}.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {blog.blog_photos.map((photo) => (
                                        <TableRow key={photo.id}>
                                            <TableCell>
                                                {photo.image && (
                                                    <img
                                                        src={`/storage/${photo.image}`}
                                                        alt="Blog Photo"
                                                        className="h-16 w-16 rounded-md object-cover"
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="destructive" size="icon" onClick={() => handleDelete(photo.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p>No photos found for {blog.title}. Click "Add New Photo" to upload one.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
