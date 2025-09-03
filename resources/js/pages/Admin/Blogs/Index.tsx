import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { truncate } from '@/lib/utils';
import type { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Image, Pencil, PlusCircle, Trash2 } from 'lucide-react';

interface Blog {
    id: number;
    title: string;
    slug: string;
    content: string;
    description: string;
    status: boolean;
    image: string;
    user_id: number;
    category_id: number;
    is_published: boolean;
    published_at: string | null;
    created_at: string;
    updated_at: string;
    user: {
        // Assuming eager loaded user
        id: number;
        name: string;
    };
    category: {
        // Assuming eager loaded category
        id: number;
        name: string;
    };
    blog_photos_count: number; // Added for photo count
}

export default function BlogIndex({ auth, blogs }: PageProps<{ blogs: Blog[] }>) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this blog?')) {
            router.delete(route('admin.blogs.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Blogs</h2>}>
            <Head title="Blogs" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-4 flex justify-end">
                            <Link href={route('admin.blogs.create')}>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Blog
                                </Button>
                            </Link>
                        </div>

                        {blogs.length > 0 ? (
                            <Table>
                                <TableCaption>A list of your blogs.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Title</TableHead>

                                        <TableHead>Category</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Published</TableHead>
                                        <TableHead>Author</TableHead>
                                        <TableHead></TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {blogs.map((blog) => (
                                        <TableRow key={blog.id}>
                                            <TableCell>
                                                {blog.image && (
                                                    <img
                                                        src={`/storage/${blog.image}`}
                                                        alt={blog.title}
                                                        className="h-16 w-16 rounded-md object-cover"
                                                    />
                                                )}
                                            </TableCell>

                                            <TableCell>{truncate(blog.title, 30)}</TableCell>
                                            <TableCell>{blog.category?.name}</TableCell>
                                            <TableCell>{blog.status ? 'Active' : 'Inactive'}</TableCell>
                                            <TableCell>{blog.is_published ? 'Yes' : 'No'}</TableCell>
                                            <TableCell>{blog.user?.name}</TableCell>
                                            <TableCell>
                                                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                                    {blog.blog_photos_count} Photos
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={route('admin.blogs.photos.index', blog.id)}>
                                                    <Button variant="outline" size="icon" className="mr-2">
                                                        <Image className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={route('admin.blogs.show', blog.id)}>
                                                    <Button variant="outline" size="icon" className="mr-2">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={route('admin.blogs.edit', blog.id)}>
                                                    <Button variant="outline" size="icon" className="mr-2">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="destructive" size="icon" onClick={() => handleDelete(blog.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p>No blogs found. Click "Create New Blog" to add one.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
