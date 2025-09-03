import { Head, Link, router } from "@inertiajs/react";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
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

interface Branch {
	id: number;
	name: string;
	address: string;
	phone: string;
	email: string;
	lng: number;
	lat: number;
}

export default function BranchIndex({
	auth,
	branches,
}: PageProps<{ branches: Branch[] }>) {
	const handleDelete = (id: number) => {
		if (confirm("Are you sure you want to delete this branch?")) {
			router.delete(route("admin.branches.destroy", id));
		}
	};

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<h2 className="text-xl leading-tight font-semibold text-gray-800">
					Branches
				</h2>
			}
		>
			<Head title="Branches" />

			<div className="py-12">
				<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
						<div className="mb-4 flex justify-end">
							<Link href={route("admin.branches.create")}>
								<Button>
									<PlusCircle className="mr-2 h-4 w-4" /> Create New Branch
								</Button>
							</Link>
						</div>

						{branches.length > 0 ? (
							<Table>
								<TableCaption>A list of your branches.</TableCaption>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>

										<TableHead>Phone</TableHead>
										<TableHead>Email</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{branches.map((branch) => (
										<TableRow key={branch.id}>
											<TableCell>{branch.name}</TableCell>

											<TableCell>{branch.phone}</TableCell>
											<TableCell>{branch.email}</TableCell>
											<TableCell>
												<Link href={route("admin.branches.edit", branch.id)}>
													<Button
														variant="outline"
														size="icon"
														className="mr-2"
													>
														<Pencil className="h-4 w-4" />
													</Button>
												</Link>
												<Button
													variant="destructive"
													size="icon"
													onClick={() => handleDelete(branch.id)}
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						) : (
							<p>No branches found. Click "Create New Branch" to add one.</p>
						)}
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
