import { Head, Link, router } from "@inertiajs/react";
import { Image as ImageIcon, Pencil, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import type { PageProps } from "@/types";

interface Page {
	id: number;
	title: string;
	contents: string;
	image: string | null;
	slug: string;
	more: string | null;
	created_at: string;
	updated_at: string;
	images_count: number; // From withCount
}

export default function PageIndex({
	auth,
	pages,
}: PageProps<{ pages: Page[] }>) {
	const handleDelete = (id: number) => {
		if (confirm("Are you sure you want to delete this page?")) {
			router.delete(route("admin.pages.destroy", id));
		}
	};

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<h2 className="text-xl leading-tight font-semibold text-gray-800">
					Pages
				</h2>
			}
		>
			<Head title="Pages" />

			<div className="py-12">
				<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
						<div className="mb-4 flex justify-end">
							<Link href={route("admin.pages.create")}>
								<Button>
									<PlusCircle className="mr-2 h-4 w-4" /> Create New Page
								</Button>
							</Link>
						</div>

						{pages.length > 0 ? (
							<Table>
								<TableCaption>A list of your pages.</TableCaption>
								<TableHeader>
									<TableRow>
										<TableHead>Title</TableHead>
										<TableHead>Main Image</TableHead>
										<TableHead>Additional Images</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{pages.map((page) => (
										<TableRow key={page.id}>
											<TableCell>{page.title}</TableCell>

											<TableCell>
												{page.image && (
													<img
														src={`/storage/${page.image}`}
														alt={page.title}
														className="h-16 w-16 rounded-md object-cover"
													/>
												)}
											</TableCell>
											<TableCell>{page.images_count}</TableCell>
											<TableCell className="flex items-center space-x-2">
												<Link href={route("admin.pages.show", page.id)}>
													<Button variant="outline" size="icon">
														<ImageIcon className="h-4 w-4" />
													</Button>
												</Link>
												<Link href={route("admin.pages.edit", page.id)}>
													<Button variant="outline" size="icon">
														<Pencil className="h-4 w-4" />
													</Button>
												</Link>
												<Link href={route("admin.pages.images.index", page.id)}>
													<Button variant="outline" size="icon">
														<ImageIcon className="h-4 w-4" />
													</Button>
												</Link>
												<Button
													variant="destructive"
													size="icon"
													onClick={() => handleDelete(page.id)}
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						) : (
							<p>No pages found. Click "Create New Page" to add one.</p>
						)}
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
