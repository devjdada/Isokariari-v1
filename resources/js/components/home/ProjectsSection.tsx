import { Link } from "@inertiajs/react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { ProjectsProps } from "@/types/ProjectsProps";

const itemVariants = {
	hidden: { opacity: 0, y: -50, x: 50 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		x: 0,
		transition: {
			delay: i * 0.2,
			duration: 0.6,
			ease: "easeOut",
		},
	}),
};

const ProjectsSection = ({ projects }: { projects: ProjectsProps[] }) => {
	const [displayedProjects, setDisplayedProjects] = useState<ProjectsProps[]>(
		[],
	);
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { once: false });

	// Function to get random projects
	const getRandomProjects = (allProjects: ProjectsProps[], count: number) => {
		const shuffled = [...allProjects].sort(() => 0.5 - Math.random());
		return shuffled.slice(0, count);
	};

	useEffect(() => {
		if (isInView && projects.length > 0) {
			console.log("IN VIEW");
			setDisplayedProjects(getRandomProjects(projects, 4));
		}
	}, [isInView, projects]);

	return (
		<section className="py-16 bg-white" ref={sectionRef}>
			<div className="container px-4 mx-auto">
				<div className="mb-12 text-center">
					<h2 className="mb-4 text-3xl font-bold text-oki-gray-dark md:text-4xl">
						Our Projects
					</h2>
					<p className="max-w-2xl mx-auto text-gray-600">
						Explore our diverse portfolio of successful projects across Nigeria,
						showcasing our expertise in various construction and engineering
						fields.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-4">
					{displayedProjects?.map((project, index) => (
						<motion.div
							key={`${project.id}-${index}`}
							variants={itemVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: false, amount: 0.1 }}
							custom={index}
							className="overflow-hidden transition-shadow bg-white rounded-lg shadow-md group hover:shadow-xl"
						>
							<div className="h-64 overflow-hidden">
								<img
									src={project.image}
									alt={project.title}
									className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
								/>
							</div>
							<div className="p-6">
								<h3 className="mb-3 text-2xl font-semibold text-oki-gray-dark">
									{project.title}
								</h3>
								<p className="mb-4 text-gray-600 line-clamp-3">
									{project.description}
								</p>
								<Link
									href={`/projects/${project.slug}`}
									className="flex items-center font-medium transition-colors text-oki-blue-dark hover:text-oki-blue-light"
								>
									<span>MORE INFO</span>
									<ArrowRight size={16} className="ml-2" />
								</Link>
							</div>
						</motion.div>
					))}
				</div>

				<div className="text-center">
					<Link href="/projects">
						<Button className="px-8 text-white bg-oki-blue-dark hover:bg-oki-blue-light">
							Explore All Projects
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default ProjectsSection;
