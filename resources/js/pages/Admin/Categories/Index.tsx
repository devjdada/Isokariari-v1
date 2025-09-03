import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import CreateCategoryForm from './Create';
import EditCategoryForm from './Edit';

interface Category {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
}

export default function CategoryIndex({ auth, categories }: PageProps<{ categories: Category[] }>) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            router.delete(route('admin.categories.destroy', id));
        }
    };

    const handleEditClick = (category: Category) => {
        setSelectedCategory(category);
        setIsEditModalOpen(true);
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Categories</h2>}>
            <Head title="Categories" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-4 flex justify-end">
                            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                                <DialogTrigger asChild>
                                    <Button>Create New Category</Button>
                                </DialogTrigger>
                                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
                                    <DialogHeader>
                                        <DialogTitle>Create New Category</DialogTitle>
                                        <DialogDescription>Fill in the details to create a new category.</DialogDescription>
                                    </DialogHeader>
                                    <CreateCategoryForm onSuccess={() => setIsCreateModalOpen(false)} />
                                </DialogContent>
                            </Dialog>
                        </div>

                        <Table>
                            <TableCaption>A list of your categories.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell className="font-medium">{category.id}</TableCell>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>{category.slug}</TableCell>
                                        <TableCell>{new Date(category.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Dialog open={isEditModalOpen && selectedCategory?.id === category.id} onOpenChange={setIsEditModalOpen}>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" size="icon" className="mr-2" onClick={() => handleEditClick(category)}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[800px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Category</DialogTitle>
                                                        <DialogDescription>Update the details of the category.</DialogDescription>
                                                    </DialogHeader>
                                                    {selectedCategory && (
                                                        <EditCategoryForm category={selectedCategory} onSuccess={() => setIsEditModalOpen(false)} />
                                                    )}
                                                </DialogContent>
                                            </Dialog>
                                            <Button variant="destructive" size="icon" onClick={() => handleDelete(category.id)}>
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
