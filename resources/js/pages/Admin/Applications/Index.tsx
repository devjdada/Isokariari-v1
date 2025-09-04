import { Head, Link, router } from "@inertiajs/react";
import { Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import type { PageProps } from "@/types";

interface JobListing {
	id: number;
	title: string;
}

interface Application {
	id: number;
	job_id: number | null;
	job_listing?: JobListing; // Optional, as job_id can be null
	full_name: string;
	email: string;
	phone: string;
	pay: string;
	location: string;
	cover: string;
	cv: string;
	letter: string;
	created_at: string;
}

interface ApplicationsIndexProps extends PageProps {
	applications: Application[];
}

export default function ApplicationsIndex({
	auth,
	applications,
}: ApplicationsIndexProps) {
	const handleDelete = (applicationId: number) => {
		if (confirm("Are you sure you want to delete this application?")) {
			router.delete(route("admin.applications.destroy", applicationId));
		}
	};

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<h2 className="font-semibold text-xl text-gray-800 leading-tight">
					Job Applications
				</h2>
			}
		>
			<Head title="Job Applications" />

			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className=" overflow-hidden shadow-sm sm:rounded-lg p-6">
						<h3 className="text-lg font-medium mb-4">All Applications</h3>

						{applications.length > 0 ? (
							<div className="overflow-x-auto">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="">
										<tr>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
											>
												Full Name
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
											>
												Email
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
											>
												Phone
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
											>
												Job Applied For
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
											>
												Applied On
											</th>
											<th scope="col" className="relative px-6 py-3">
												<span className="sr-only">Actions</span>
											</th>
										</tr>
									</thead>
									<tbody className=" divide-y ">
										{applications.map((application) => (
											<tr key={application.id}>
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
													{application.full_name}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm ">
													{application.email}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm ">
													{application.phone}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm ">
													{application.job_listing
														? application.job_listing.title
														: "Open Application"}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm ">
													{new Date(
														application.created_at,
													).toLocaleDateString()}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
													<Link
														href={route(
															"admin.applications.show",
															application.id,
														)}
														className="text-indigo-600 hover:text-indigo-900 mr-3"
													>
														<Button variant="outline" size="icon">
															<Eye className="h-4 w-4" />
														</Button>
													</Link>
													<Button
														variant="destructive"
														size="icon"
														onClick={() => handleDelete(application.id)}
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<p>No job applications found.</p>
						)}
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
