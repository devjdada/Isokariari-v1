import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Pencil, PlusCircle, Trash2 } from 'lucide-react';

interface HeroContent {
    id: number;
    title: string;
    subtitle: string | null;
    description: string | null;
    image_path: string;
    button_text: string | null;
    button_link: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export default function HeroContentIndex({ auth, heroContents }: PageProps<{ heroContents: HeroContent[] }>) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this hero content?')) {
            router.delete(route('admin.hero-contents.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Hero Contents</h2>}>
            <Head title="Hero Contents" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-4 flex justify-end">
                            <Link href={route('admin.hero-contents.create')}>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Hero Content
                                </Button>
                            </Link>
                        </div>

                        {heroContents.length > 0 ? (
                            <Table>
                                <TableCaption>A list of your hero contents.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Subtitle</TableHead>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Active</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {heroContents.map((heroContent) => (
                                        <TableRow key={heroContent.id}>
                                            <TableCell>{heroContent.title}</TableCell>
                                            <TableCell>{heroContent.subtitle}</TableCell>
                                            <TableCell>
                                                {heroContent.image_path && (
                                                    <img
                                                        src={`/storage/${heroContent.image_path}`}
                                                        alt={heroContent.title}
                                                        className="h-16 w-16 rounded-md object-cover"
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell>{heroContent.is_active ? 'Yes' : 'No'}</TableCell>
                                            <TableCell className="flex items-center space-x-2">
                                                <Link href={route('admin.hero-contents.show', heroContent.id)}>
                                                    <Button variant="outline" size="icon" className="mr-2">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={route('admin.hero-contents.edit', heroContent.id)}>
                                                    <Button variant="outline" size="icon" className="mr-2">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="destructive" size="icon" onClick={() => handleDelete(heroContent.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p>No hero contents found. Click "Create New Hero Content" to add one.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
