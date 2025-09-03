import { Head, Link, usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ClientsCarousel from "@/components/home/ClientsCarousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import WebLayout from "@/layouts/WebLayout";
import { cn } from "@/lib/utils";
import type { SharedData } from "@/types";
import type { ProjectsProps } from "@/types/ProjectsProps";

interface ProjectsIndexProps {
	projects: ProjectsProps[];
	allCat: { id: number; name: string }[];
}

const Projects = ({ projects, allCat }: ProjectsIndexProps) => {
	const { props } = usePage<SharedData>();
	const clients = props.sharedClients || [];
	const [searchTerm, setSearchTerm] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("all");
	// ✅ Extract unique categories from the project list
	const categories = useMemo(() => {
		const uniqueCategories =
			projects && Array.isArray(projects)
				? Array.from(new Set(projects.map((p) => p.category.name))).map(
						(slug) => ({
							id: slug,
							name:
								projects.find((p) => p.category.slug === slug)?.category.name ||
								slug.replace(/-/g, " "),
							slug: slug,
						}),
					)
				: [];

		return [
			{ id: "all", name: "All Projects", slug: "all" },
			...uniqueCategories,
		];
	}, [projects]);

	const filteredProjects: ProjectsProps[] = projects.filter((post) => {
		const matchesSearch =
			post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			post.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory =
			categoryFilter === "all" || post.category.name === categoryFilter;
		return matchesSearch && matchesCategory;
	});

	const [bgImage, setBgImage] = useState<string>("");

	const fallbackImage = "/images/logo.png"; // Use your own fallback image URL
	useEffect(() => {
		let intervalId;

		if (Array.isArray(projects) && projects.length > 0) {
			const validImages = projects
				.map((h) => h?.image?.trim())
				.filter((img) => img); // filter out empty or undefined images

			if (validImages.length > 1) {
				// Set an initial image
				setBgImage(validImages[Math.floor(Math.random() * validImages.length)]);

				intervalId = setInterval(() => {
					const randomImage =
						validImages[Math.floor(Math.random() * validImages.length)];
					setBgImage(randomImage);
				}, 3000); // change every 3 seconds
			} else {
				// Only one image or none available
				setBgImage(validImages[0] || fallbackImage);
			}
		} else {
			setBgImage(fallbackImage);
		}

		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	}, [projects]);
	return (
		<WebLayout>
			<Head title="Projects" />

			<style>{`
				.team-hero-bg {
					background-image: linear-gradient(
							to right,
							rgba(0, 70, 173, 0.85),
							rgba(0, 160, 233, 0.85)
						),
						url(${bgImage});
					background-size: cover;
					background-position: center;
				}
			`}</style>
			<div>
				{/* Hero */}
				<section className="team-hero-bg py-20 text-white">
					<div className="container mx-auto px-4 py-20">
						<div className="max-w-3xl">
							<h1 className="mb-6 text-4xl font-bold md:text-5xl">
								Our Projects
							</h1>
							<p className="text-xl text-white/90">
								Explore our diverse portfolio of successful projects across
								Nigeria, showcasing our expertise in various construction and
								engineering fields.
							</p>
						</div>
					</div>

					{/* Category Filter */}
					{/* Filter/Search Section */}
					<section className="py-8 bg-white-500/20">
						<div className="container mx-auto px-4">
							<div className="flex flex-col md:flex-row gap-4 items-center justify-between">
								<div className="relative w-full md:max-w-md">
									<Search
										className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
										size={18}
									/>
									<Input
										type="text"
										placeholder="Search articles..."
										className="pl-10"
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
								</div>

								<div className="flex flex-wrap gap-2">
									{allCat.map((category) => (
										<Button
											key={category.name}
											variant="ghost"
											className={`border ${
												categoryFilter === category.name
													? "bg-oki-blue-dark text-white border-oki-blue-dark"
													: "bg-white text-oki-gray-dark border-gray-300 hover:bg-oki-blue-dark/10"
											}`}
											onClick={() => setCategoryFilter(category.name)}
										>
											{category.name}
										</Button>
									))}
								</div>
							</div>
						</div>
					</section>
				</section>

				{/* Project Grid */}
				<section className="py-16">
					<div className="container mx-auto px-4">
						{
							<>
								<AnimatePresence mode="wait">
									<motion.div
										key={categoryFilter + searchTerm}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
										className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
									>
										{filteredProjects.map((project, index) => (
											<motion.div
												key={project.id}
												className="group overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl"
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.4, delay: index * 0.1 }}
												layout
											>
												<div className="h-64 overflow-hidden">
													<img
														src={project.image}
														alt={project.title}
														className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
													/>
												</div>
												<div className="p-6">
													<div className="mb-3">
														<span className="rounded-full bg-oki-gray-light px-3 py-1 text-sm text-oki-gray-dark capitalize">
															{project.category.name}
														</span>
													</div>
													<Link
														href={`/projects/${project.slug}`}
														className="flex items-center font-medium text-oki-blue-dark transition-colors hover:text-oki-blue-light"
													>
														<h3 className="mb-3 line-clamp-4 text-2xl font-semibold text-oki-gray-dark">
															{project.title}
														</h3>
													</Link>
													<p className="mb-4 line-clamp-6 text-gray-600">
														{project.description}
													</p>
													<Link
														href={`/projects/${project.slug}`}
														className="flex items-center font-medium text-oki-blue-dark transition-colors hover:text-oki-blue-light"
													>
														<span>View Project</span>
														<ArrowRight size={16} className="ml-2" />
													</Link>
												</div>
											</motion.div>
										))}
									</motion.div>
								</AnimatePresence>

								{filteredProjects.length === 0 && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.5 }}
										className="py-12 text-center"
									>
										<h3 className="mb-4 text-2xl font-semibold text-oki-gray-dark">
											No projects found
										</h3>
										<p className="text-gray-600">
											There are no projects in this category at the moment.
										</p>
									</motion.div>
								)}
							</>
						}
					</div>
				</section>

				<ClientsCarousel clients={clients} />

				<section className="bg-oki-gray-dark py-16 text-white">
					<div className="container mx-auto px-4 text-center">
						<h2 className="mb-6 text-3xl font-bold">Have a Project in Mind?</h2>
						<p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
							We're ready to bring your vision to life with our expertise and
							five decades of construction excellence.
						</p>
						<Link href="/contact">
							<Button className="bg-oki-red px-8 py-6 text-white hover:bg-oki-red/90">
								Discuss Your Project
							</Button>
						</Link>
					</div>
				</section>
			</div>
		</WebLayout>
	);
};

export default Projects;
