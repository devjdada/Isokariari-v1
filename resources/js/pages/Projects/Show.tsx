import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, ArrowRight, Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import WebLayout from "@/layouts/WebLayout";
import type { ProjectsProps } from "@/types/ProjectsProps";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import { cn } from "@/lib/utils";

interface ProjectShowProps {
	project: ProjectsProps;
	relatedProjects: ProjectsProps[];
}

const ProjectDetail = ({ project, relatedProjects }: ProjectShowProps) => {
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

	const splitParagraphs = (text: string) => {
		if (!text) return [];
		return text.split("\r\n").filter((paragraph) => paragraph.trim() !== "");
	};

	return (
		<WebLayout>
			<Head title={project.title} />

			<section
				className="bg-gradient-blue py-20 text-white"
				style={{
					backgroundImage: `linear-gradient(to right, rgba(0, 70, 173, 0.85), rgba(0, 160, 233, 0.85)), url(${project.image})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div className="container mx-auto px-4 pt-20">
					<div className="max-w-3xl">
						<Link
							href="/projects"
							className="mb-4 inline-flex items-center text-white/90 hover:text-white"
						>
							<ArrowLeft size={16} className="mr-2" />
							<span>Back to Projects</span>
						</Link>
						<h1 className="mb-6 text-4xl font-bold md:text-5xl">
							{project.title}
						</h1>
						<p className="text-xl text-white/90"></p>
					</div>
				</div>
			</section>

			{/* Project Details */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
						<div className="lg:col-span-2">
							<img src={project.image} alt={project.title} className="pb-4" />
							<h2 className="mb-6 text-3xl font-bold text-oki-gray-dark">
								Overview
							</h2>
							{project.description ? (
								<div
									className="prose prose-gray max-w-none"
									dangerouslySetInnerHTML={{
										__html: project.description,
									}}
								/>
							) : (
								<p className="text-gray-500">No documentation provided.</p>
							)}

							<div className="h-10"></div>
							{project.more_projects.map((more, i) =>
								more.position === "right" ? (
									<div key={more.image} className="grid grid-cols-2 gap-5 mt-8">
										<img src={more.image} alt={"More "} />

										<div
											className="prose prose-gray max-w-none"
											dangerouslySetInnerHTML={{
												__html: more.doc,
											}}
										/>
									</div>
								) : (
									<div key={more.image} className="grid grid-cols-2 gap-5 mt-8">
										<div
											className="prose prose-gray max-w-none"
											dangerouslySetInnerHTML={{
												__html: more.doc,
											}}
										/>
										<img src={more.image} alt={` More`} />
									</div>
								),
							)}
							<div className="p-4">
								<h3 className="text-2xl font-bold mb-6 text-oki-gray-dark">
									Project Gallery
								</h3>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-2">
									{project.project_photos?.map((image, index) => (
										<div
											key={image.id}
											className={cn(
												"overflow-hidden rounded-lg h-64 cursor-pointer",
												index === 0 && "md:col-span-2 md:row-span-2 md:h-full",
												index === 5 && "md:col-span-1 md:row-span-2 md:h-full",
												index === 9 && "md:col-span-3 md:row-span-1 md:h-full",
												index === 10 && "md:col-span-2 md:row-span-1 md:h-full",
											)}
										>
											<img
												onClick={() => setLightboxIndex(index)}
												src={image.image}
												alt={`Photo ${index + 1}`}
												className="w-full h-full object-cover hover:scale-105 grayscale-50 hover:grayscale-0 transition-transform duration-500"
											/>
										</div>
									))}
								</div>

								{lightboxIndex !== null && (
									<Lightbox
										open
										index={lightboxIndex}
										close={() => setLightboxIndex(null)}
										slides={project.project_photos.map((img) => ({
											src: img.image,
											title: project.title,
											description: project.title,
										}))}
										plugins={[Thumbnails, Captions]}
									/>
								)}
							</div>
						</div>

						<div className="lg:col-span-1">
							<div className="bg-oki-gray-light rounded-lg p-6 sticky top-24">
								<h3 className="text-xl font-semibold mb-6 text-oki-gray-dark">
									Project Details
								</h3>

								<div className="space-y-4 mb-6">
									<div className="flex">
										<div className="w-12 text-oki-blue-dark flex-shrink-0">
											<img
												src={project.client.image}
												alt={project.client.name}
											/>
										</div>
										<div>
											<p className="font-medium text-oki-gray-dark">Client</p>
											<p className="text-gray-600">{project.client.name}</p>
										</div>
									</div>
									<div className="flex">
										<div className="w-8 text-oki-blue-dark flex-shrink-0">
											<MapPin size={18} />
										</div>
										<div>
											<p className="font-medium text-oki-gray-dark">Location</p>
											<p className="text-gray-600">{project.location}</p>
										</div>
									</div>

									<div className="flex">
										<div className="w-8 text-oki-blue-dark flex-shrink-0">
											<Calendar size={18} />
										</div>
										<div>
											<p className="font-medium text-oki-gray-dark">
												Completion Status
											</p>
											<p className="text-gray-600">{project.complete}</p>
										</div>
									</div>

									<div className="flex">
										<div className="w-8 text-oki-blue-dark flex-shrink-0">
											<span className="inline-block w-5 text-center">#</span>
										</div>
										<div>
											<p className="font-medium text-oki-gray-dark">Category</p>
											<p className="text-gray-600 capitalize">
												{project.category.name}
											</p>
										</div>
									</div>
								</div>

								<div className="border-t border-gray-300 pt-6">
									<h4 className="font-semibold mb-4 text-oki-gray-dark">
										Interested in a similar project?
									</h4>
									<Link to="/contact">
										<Button className="bg-oki-red hover:bg-oki-red/90 text-white w-full">
											Contact Us
										</Button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Related Projects */}
			{relatedProjects.length > 0 && (
				<section className="bg-oki-gray-light py-16">
					<div className="container mx-auto px-4">
						<h2 className="mb-10 text-center text-3xl font-bold text-oki-gray-dark">
							Other Projects You Might Need
						</h2>

						<div className="grid grid-cols-2 gap-8 md:grid-cols-4">
							{relatedProjects.map((relatedProject) => (
								<div
									key={relatedProject.id}
									className="group overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
								>
									<div className="h-64 overflow-hidden">
										<img
											src={relatedProject.image}
											alt={relatedProject.title}
											className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
										/>
									</div>
									<div className="p-6">
										<div className="mb-3">
											<span className="rounded-full bg-oki-gray-light px-3 py-1 text-sm text-oki-gray-dark capitalize">
												{/* {relatedProject.category.name} */}
											</span>
										</div>
										<Link
											href={`/projects/${relatedProject.slug}`}
											className="flex items-center font-medium text-oki-blue-dark transition-colors hover:text-oki-blue-light"
										>
											<h3 className="mb-3 text-2xl font-semibold text-oki-gray-dark">
												{relatedProject.title}
											</h3>
										</Link>
										<Link
											href={`/projects/${relatedProject.slug}`}
											className="flex items-center font-medium text-oki-blue-dark transition-colors hover:text-oki-blue-light"
										>
											<span>View Project</span>
											<ArrowRight size={16} className="ml-2" />
										</Link>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			)}
		</WebLayout>
	);
};
export default ProjectDetail;
