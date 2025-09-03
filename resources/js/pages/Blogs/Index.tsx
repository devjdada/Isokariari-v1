import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Search, User } from "lucide-react";
import { a } from "node_modules/framer-motion/dist/types.d-Cjd591yU";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import WebLayout from "@/layouts/WebLayout";
import type { BlogProps } from "@/types/BlogsProps";

interface BlogIndexProps {
	blogPosts: BlogProps[];
	allCat: { id: number; name: string }[];
}

const Blog = ({ blogPosts, allCat }: BlogIndexProps) => {
	const [loading, setLoading] = useState(false); // Data is passed as prop, so no initial loading
	const [searchTerm, setSearchTerm] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [bgImage, setBgImage] = useState<string>("");

	const fallbackImage = "/images/logo.png"; // Use your own fallback image URL

	useEffect(() => {
		let intervalId;

		if (Array.isArray(blogPosts) && blogPosts.length > 0) {
			const validImages = blogPosts
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
	}, [blogPosts]);

	const categories = useMemo(() => {
		return [
			"all",
			...Array.from(new Set(blogPosts.map((post) => post.category))),
		];
	}, [blogPosts]);

	const filteredPosts = blogPosts.filter((post) => {
		const matchesSearch =
			post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			post.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory =
			categoryFilter === "all" || post.category.name === categoryFilter;
		return matchesSearch && matchesCategory;
	});

	return (
		<WebLayout>
			<Head title="Blogs" />

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
							<h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
							<p className="text-xl text-white/90">
								Insights, news, and knowledge-sharing from O.K. Isokariari
								Nigeria Limited's experts on engineering, construction, and
								industry trends.
							</p>
						</div>
					</div>
				</section>

				{/* Filter/Search Section */}
				<section className="py-8 bg-oki-gray-light">
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

				{/* Blog Posts */}
				<section className="py-16">
					<div className="container mx-auto px-4">
						{filteredPosts.length > 0 ? (
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
								{filteredPosts.map((post) => (
									<motion.article
										key={post.id}
										variants={{
											hidden: { opacity: 0, y: 30 },
											show: { opacity: 1, y: 0 },
										}}
										transition={{ duration: 0.5 }}
										className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col"
									>
										<div className="h-48 overflow-hidden">
											<img
												src={post.image || fallbackImage}
												alt={post.title}
												className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
											/>
										</div>
										<div className="p-6 flex-grow flex flex-col">
											<div className="mb-3">
												<span className="bg-oki-gray-light text-oki-gray-dark text-xs px-3 py-1 rounded-full">
													{post.category.name}
												</span>
											</div>
											<h2 className="text-xl font-bold mb-3 text-oki-gray-dark">
												<Link
													href={`/blogs/${post.slug}`}
													className="hover:text-oki-blue-dark transition-colors"
												>
													{post.title}
												</Link>
											</h2>
											<p className="text-gray-600 mb-4 flex-grow">
												{post.description}
											</p>
											<div className="flex items-center justify-between text-sm text-gray-500 mb-4">
												<div className="flex items-center">
													<User size={14} className="mr-1" />
													<span>{post.user.name}</span>
												</div>
												<div className="flex items-center">
													<Calendar size={14} className="mr-1" />
													<span>
														{new Date(post.created_at).toLocaleDateString()}
													</span>
												</div>
											</div>
											<Link
												href={`/blogs/${post.slug}`}
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
									No posts found
								</h3>
								<p className="text-gray-600 mb-6">
									We couldn't find any blog posts matching your search criteria.
								</p>
								<Button
									variant="outline"
									className="border-oki-blue-dark text-oki-blue-dark hover:bg-oki-blue-dark hover:text-white"
									onClick={() => {
										setSearchTerm("");
										setCategoryFilter("all");
									}}
								>
									Clear Filters
								</Button>
							</div>
						)}
					</div>
				</section>

				{/* Newsletter Section */}
				<section className="py-16 bg-oki-gray-light">
					<div className="container mx-auto px-4">
						<div className="max-w-2xl mx-auto text-center">
							<h2 className="text-3xl font-bold mb-6 text-oki-gray-dark">
								Subscribe to Our Newsletter
							</h2>
							<p className="text-gray-600 mb-8">
								Stay updated with the latest industry insights, company news,
								and project highlights delivered directly to your inbox.
							</p>
							<div className="flex flex-col sm:flex-row gap-4">
								<Input
									type="email"
									placeholder="Your email address"
									className="flex-grow"
								/>
								<Button className="bg-oki-blue-dark hover:bg-oki-blue-light text-white">
									Subscribe
								</Button>
							</div>
						</div>
					</div>
				</section>
			</div>
		</WebLayout>
	);
};

export default Blog;
