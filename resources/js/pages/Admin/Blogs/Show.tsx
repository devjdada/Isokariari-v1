import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import type { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

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
    blog_photos: BlogPhoto[];
}

export default function BlogShow({ auth, blog }: PageProps<{ blog: Blog }>) {
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Blog Details</h2>}>
            <Head title={blog.title} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <h3 className="mb-4 text-lg font-medium">{blog.title}</h3>
                        <p>
                            <strong>Slug:</strong> {blog.slug}
                        </p>
                        <p>
                            <strong>Description:</strong> {blog.description}
                        </p>
                        {blog.image && (
                            <div className="mt-4">
                                <img src={`/storage/${blog.image}`} alt={blog.title} className="h-auto max-w-xs rounded-md" />
                            </div>
                        )}
                        <p>
                            <strong>Status:</strong> {blog.status ? 'Active' : 'Inactive'}
                        </p>
                        <p>
                            <strong>Category:</strong> {blog.category?.name}
                        </p>
                        <p>
                            <strong>Published:</strong> {blog.is_published ? 'Yes' : 'No'}
                        </p>
                        {blog.published_at && (
                            <p>
                                <strong>Published At:</strong> {new Date(blog.published_at).toLocaleDateString()}
                            </p>
                        )}
                        <p>
                            <strong>Author:</strong> {blog.user?.name}
                        </p>
                        <div className="mt-4">
                            <strong>Content:</strong>
                            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                        </div>

                        {blog.blog_photos.length > 0 && (
                            <div className="mt-6">
                                <h4 className="mb-2 text-lg font-medium">Additional Photos:</h4>
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                    {blog.blog_photos.map((photo) => (
                                        <img
                                            key={photo.id}
                                            src={`/storage/${photo.image}`}
                                            alt="Blog Photo"
                                            className="h-32 w-full rounded-md object-cover"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
