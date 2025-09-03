import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import WebLayout from "@/layouts/WebLayout";
import type { ProjectsProps } from "@/types/ProjectsProps";

interface ClientProject {
	id: number;
	title: string;
	slug: string;
}

interface ClientProps {
	id: number;
	name: string;
	image: string;
	content: string;
	projects: ClientProject[];
}

interface ClientsIndexProps {
	clients: ClientProps[];
	projects: ProjectsProps[];
}

const Clients = ({ clients, projects }: ClientsIndexProps) => {
	const [bgImage, setBgImage] = useState<string>("");

	const fallbackImage = "/images/logo.png"; // Use your own fallback image URL
	console.log(clients);
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
			<Head title="Clients" />

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

			{/* Hero Section */}
			<section className="team-hero-bg text-white py-20 pt-32">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl">
						<h1 className="text-4xl md:text-5xl font-bold mb-6">Our Clients</h1>
						<p className="text-xl text-white/90 leading-relaxed">
							For over five decades, we've built trust and delivered excellence
							to a diverse range of clients across Nigeria and beyond. Discover
							the companies and organizations that have partnered with O.K.
							Isokariari Nigeria Limited.
						</p>
					</div>
				</div>
			</section>

			{/* Clients Grid */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{clients.map((client) => (
							<motion.div
								key={client.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								viewport={{ once: true }}
								className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
							>
								<div className="p-8 flex flex-col items-center">
									<div className="w-48 h-48 mb-6 overflow-hidden flex items-center justify-center">
										<img
											src={client.image}
											alt={`${client.name} logo`}
											className="max-w-full max-h-full object-contain"
										/>
									</div>
									<h2 className="text-2xl font-bold text-center mb-3 text-oki-gray-dark">
										{client.name}
									</h2>
									<p className="text-gray-600 text-center mb-4">
										{client.content}
									</p>
									{client.projects.length > 0 && (
										<div className="w-full mt-4">
											<h3 className="text-sm font-semibold text-oki-gray-dark mb-2">
												Projects
											</h3>
											<div className="flex flex-wrap gap-2">
												{client.projects.map((project) => (
													<Link
														key={project.id}
														href={`/projects/${project.slug}`}
													>
														<span className="text-xs bg-oki-blue-light/10 text-oki-blue-dark px-2 py-1 rounded line-clamp-2">
															{project.title}
														</span>
													</Link>
												))}
											</div>
										</div>
									)}
								</div>
							</motion.div>
						))}
					</div>

					{clients.length === 0 && (
						<div className="text-center py-16">
							<h3 className="text-2xl font-semibold text-gray-800">
								No clients found
							</h3>
							<p className="text-gray-600 mt-2">
								There are no clients in this category.
							</p>
						</div>
					)}
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 bg-oki-gray-dark text-white">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-6">Become Our Client</h2>
					<p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
						Join our growing list of satisfied clients and experience the
						exceptional quality and service that O.K. Isokariari Nigeria Limited
						is known for.
					</p>
					<Link
						href="/contact"
						className="bg-oki-blue-dark hover:bg-oki-blue-light transition-colors px-8 py-3 rounded text-white font-medium"
					>
						Contact Us Today
					</Link>
				</div>
			</section>
		</WebLayout>
	);
};

export default Clients;
