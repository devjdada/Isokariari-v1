import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import WebLayout from "@/layouts/WebLayout";

interface PageProps {
	id: number;
	title: string;
	slug: string;
	contents: string;
	image: string | null;
}

interface PagesIndexProps {
	pages: PageProps[];
}

const Pages = ({ pages }: PagesIndexProps) => {
	const [bgImage, setBgImage] = useState<string>("");

	const fallbackImage = "/images/logo.png";

	useEffect(() => {
		let intervalId: NodeJS.Timeout;

		if (Array.isArray(pages) && pages.length > 0) {
			const validImages = pages
				.map((p) => p?.image?.trim())
				.filter((img) => img); // filter out empty or undefined images

			if (validImages.length > 1) {
				// Set an initial image
				setBgImage(validImages[Math.floor(Math.random() * validImages.length)]);

				intervalId = setInterval(() => {
					const randomImage =
						validImages[Math.floor(Math.random() * validImages.length)];
					setBgImage(randomImage);
				}, 3000);
			} else {
				setBgImage(validImages[0] || fallbackImage);
			}
		} else {
			setBgImage(fallbackImage);
		}

		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	}, [pages]);

	return (
		<WebLayout>
			<Head title="Pages" />

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
				{/* Hero Section */}
				<section className="team-hero-bg text-white py-20 pt-32">
					<div className="container mx-auto px-4">
						<div className="max-w-3xl">
							<h1 className="text-4xl md:text-5xl font-bold mb-6">All Pages</h1>
							<p className="text-xl text-white/90">
								Discover all the content available on our website.
							</p>
						</div>
					</div>
				</section>

				{/* Pages List */}
				<section className="py-16">
					<div className="container mx-auto px-4">
						{pages.length > 0 ? (
							<motion.div
								className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
								initial="hidden"
								animate="show"
								variants={{
									hidden: {},
									show: {
										transition: {
											staggerChildren: 0.15,
										},
									},
								}}
							>
								{pages.map((page) => (
									<motion.article
										key={page.id}
										variants={{
											hidden: { opacity: 0, y: 30 },
											show: { opacity: 1, y: 0 },
										}}
										transition={{ duration: 0.5 }}
										className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col"
									>
										<div className="h-48 overflow-hidden">
											<img
												src={page.image || fallbackImage}
												alt={page.title}
												className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
											/>
										</div>
										<div className="p-6 flex-grow flex flex-col">
											<h2 className="text-xl font-bold mb-3 text-oki-gray-dark">
												<Link
													href={`/pages/${page.slug}`}
													className="hover:text-oki-blue-dark transition-colors"
												>
													{page.title}
												</Link>
											</h2>
											<p className="text-gray-600 mb-4 flex-grow">
												{page.contents
													? `${page.contents.substring(0, 100)}...`
													: "No content available."}
											</p>
											<Link
												href={`/pages/${page.slug}`}
												className="flex items-center text-oki-blue-dark font-medium hover:text-oki-blue-light transition-colors mt-auto"
											>
												<span>Read More</span>
												<ArrowRight size={16} className="ml-2" />
											</Link>
										</div>
									</motion.article>
								))}
							</motion.div>
						) : (
							<div className="text-center py-12">
								<h3 className="text-2xl font-semibold text-oki-gray-dark mb-4">
									No pages found
								</h3>
								<p className="text-gray-600 mb-6">
									There are no pages to display at the moment.
								</p>
							</div>
						)}
					</div>
				</section>
			</div>
		</WebLayout>
	);
};

export default Pages;
