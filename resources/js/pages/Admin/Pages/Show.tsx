import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import type { PageProps } from "@/types";

interface PageImage {
	id: number;
	pageId: number;
	image: string;
	created_at: string;
	updated_at: string;
}

interface Page {
	id: number;
	title: string;
	contents: string;
	image: string | null;
	slug: string;
	more: string | null;
	created_at: string;
	updated_at: string;
	images: PageImage[];
}

export default function PageShow({ auth, page }: PageProps<{ page: Page }>) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<h2 className="text-xl leading-tight font-semibold text-gray-800">
					Page Details
				</h2>
			}
		>
			<Head title={page.title} />

			<div className="py-12">
				<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
						<h3 className="mb-4 text-lg font-medium">{page.title}</h3>
						<p>
							<strong>Slug:</strong> {page.slug}
						</p>
						{page.image && (
							<div className="mt-4">
								<img
									src={`/storage/${page.image}`}
									alt={page.title}
									className="h-auto max-w-xs rounded-md"
								/>
							</div>
						)}
						<div className="mt-4">
							<strong>Contents:</strong>
							<div dangerouslySetInnerHTML={{ __html: page.contents }} />
						</div>

						{page.more && (
							<div className="mt-4">
								<strong>More Details:</strong>
								<div dangerouslySetInnerHTML={{ __html: page.more }} />
							</div>
						)}

						{page.images.length > 0 && (
							<div className="mt-6">
								<h4 className="mb-2 text-lg font-medium">Additional Images:</h4>
								<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
									{page.images.map((image) => (
										<img
											key={image.id}
											src={`/storage/${image.image}`}
											alt="Page Image"
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

