import { Head } from "@inertiajs/react";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import type { PageProps } from "@/types";

// Assuming a global Project type is defined in @/types
// If not, define it here based on the data structure from the controller
interface User {
	id: number;
	name: string;
}

interface Category {
	id: number;
	name: string;
}

interface Client {
	id: number;
	name: string;
}

interface ProjectPhoto {
	id: number;
	photo: string;
}

interface MoreProject {
	id: number;
	doc: string;
	position: string;
	image: string;
}

interface Project {
	id: number;
	title: string;
	description: string;
	doc: string;
	image: string;
	location: string | null;
	complete: string;
	slug: string;
	status: boolean;
	type: string;
	category: Category;
	client: Client | null;
	posted_by: User;
	edited_by: User | null;
	created_at: string;
	updated_at: string;
	project_photos: ProjectPhoto[];
	more_projects: MoreProject[];
}

export default function ProjectShow({
	auth,
	project,
}: PageProps<{ project: Project }>) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<h2 className="text-xl leading-tight font-semibold">Project Details</h2>
			}
		>
			<Head title="Project Details" />

			<div className="py-12">
				<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
					<Card>
						<CardHeader>
							<CardTitle>{project.title}</CardTitle>
							<CardDescription>{project.slug}</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div>
								<Label>Image</Label>
								<div className="mt-2">
									<img
										src={`/storage/${project.image}`}
										alt={project.title}
										className="h-auto max-w-md rounded-md"
									/>
								</div>
							</div>

							<div>
								<Label>Description</Label>
								<p className="mt-1 text-sm text-muted-foreground">
									{project.description}
								</p>
							</div>

							<div>
								<Label>Project Details</Label>
								<div
									className="prose prose-sm mt-1 max-w-none"
									dangerouslySetInnerHTML={{ __html: project.doc }}
								/>
							</div>

							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								<div>
									<Label>Location</Label>
									<p className="mt-1 text-sm text-muted-foreground">
										{project.location || "N/A"}
									</p>
								</div>
								<div>
									<Label>Completion Status</Label>
									<p className="mt-1 text-sm text-muted-foreground">
										{project.complete}
									</p>
								</div>
								<div>
									<Label>Status</Label>
									<p className="mt-1">
										<Badge variant={project.status ? "default" : "destructive"}>
											{project.status ? "Active" : "Inactive"}
										</Badge>
									</p>
								</div>
								<div>
									<Label>Type</Label>
									<p className="mt-1 text-sm text-muted-foreground">
										{project.type}
									</p>
								</div>
								<div>
									<Label>Category</Label>
									<p className="mt-1 text-sm text-muted-foreground">
										{project.category.name}
									</p>
								</div>
								<div>
									<Label>Client</Label>
									<p className="mt-1 text-sm text-muted-foreground">
										{project.client?.name || "N/A"}
									</p>
								</div>
								{project.edited_by && (
									<div>
										<Label>Posted By</Label>
										<p className="mt-1 text-sm text-muted-foreground">
											{project.posted_by.name}
										</p>
									</div>
								)}
								{project.edited_by && (
									<div>
										<Label>Edited By</Label>
										<p className="mt-1 text-sm text-muted-foreground">
											{project.edited_by.name}
										</p>
									</div>
								)}
								<div>
									<Label>Created At</Label>
									<p className="mt-1 text-sm text-muted-foreground">
										{new Date(project.created_at).toLocaleString()}
									</p>
								</div>
								<div>
									<Label>Last Updated</Label>
									<p className="mt-1 text-sm text-muted-foreground">
										{new Date(project.updated_at).toLocaleString()}
									</p>
								</div>
							</div>

							<div>
								<Label>Project Photos</Label>
								<div className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-4">
									{project.project_photos.map((photo) => (
										<div key={photo.id}>
											<img
												src={`/storage/${photo.image}`}
												alt="Project Photo"
												className="rounded-md"
											/>
										</div>
									))}
								</div>
							</div>

							<div>
								<Label>More Projects</Label>
								<ul className="mt-2 grid grid-cols-4 gap-5">
									{project.more_projects.map((moreProject) => (
										<div
											key={moreProject.id}
											className="mb-2 grid grid-cols-1 gap-2"
										>
											<img
												src={`/storage/${moreProject.image}`}
												alt="More Project"
												className="h-auto max-w-xs rounded-md"
												style={{ height: "150px", width: "100%" }}
											/>
											<div
												className="mt-2"
												dangerouslySetInnerHTML={{ __html: moreProject.doc }}
											/>
										</div>
									))}
								</ul>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
