import { Head, Link } from "@inertiajs/react";
import {
	ArrowLeft,
	Calendar,
	Facebook,
	Linkedin,
	Tag,
	Twitter,
	User,
} from "lucide-react";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import { Button } from "@/components/ui/button";
import WebLayout from "@/layouts/WebLayout";
import { cn } from "@/lib/utils";
import type { BlogProps } from "@/types/BlogsProps";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

interface BlogShowProps {
	blogPost: BlogProps;
	posts: BlogProps[]; // Renamed from relatedPosts to match controller
}

const BlogPost = ({ blogPost, posts }: BlogShowProps) => {
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

	const formatDate = (isoDate: string) => {
		const date = new Date(isoDate);
		const months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
	};

	const splitParagraphs = (text: string) => {
		return text.split(/\r?\n/).filter((paragraph) => paragraph.trim() !== "");
	};

	return (
		<WebLayout>
			{/* Hero Section */}
			<section
				className="relative py-24"
				style={{
					backgroundImage: `url(${blogPost.image})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div className="absolute inset-0 bg-oki-blue-dark/75"></div>
				<div className="container pt-20 mx-auto px-4 relative z-10">
					<Link
						href="/blogs"
						className="inline-flex items-center text-white/90 hover:text-white mb-6"
					>
						<ArrowLeft size={16} className="mr-2" />
						<span>Back to Blog</span>
					</Link>
					<h1 className="text-4xl md:text-5xl font-bold mb-6 text-white max-w-4xl">
						{blogPost.title}
					</h1>
					<div className="flex flex-wrap items-center gap-6 text-white/80">
						<div className="flex items-center">
							<User size={18} className="mr-2" />
							<span>{blogPost.user.name}</span>
						</div>
						<div className="flex items-center">
							<Calendar size={18} className="mr-2" />
							<span>{formatDate(blogPost.created_at)}</span>
						</div>
						<div className="flex items-center">
							<Tag size={18} className="mr-2" />
							<span>{blogPost.category.name}</span>
						</div>
					</div>
				</div>
			</section>

			{/* Blog Content */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
						<div className="container lg:col-span-2 mx-auto px-4">
							<div className="prose prose-lg max-w-none">
								{blogPost.content ? (
									<div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
								) : (
									<p className="text-gray-500">No content provided.</p>
								)}
							</div>

							<div className="p-4">
								<h3 className="text-2xl font-bold mb-6 text-oki-gray-dark">
									Blog Gallery
								</h3>
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
									{blogPost.blog_photos?.map((image, index) => (
										<div
											key={image.id}
											className={cn(
												"overflow-hidden rounded-lg h-64 cursor-pointer",
												index === 0 && "md:col-span-2 md:row-span-2 md:h-full",
												index === 1 && "md:col-span-1 md:row-span-1",
												index === 2 && "md:col-span-1 md:row-span-2",
												index === 3 && "md:col-span-2 md:row-span-1",
												index === 4 && "md:col-span-2 md:row-span-1",
												index === 5 && "md:col-span-1 md:row-span-2",
											)}
										>
											<img
												onClick={() => setLightboxIndex(index)}
												src={image.image}
												alt={`${blogPost.title} - Image ${index + 1}`}
												className="w-full h-full object-cover hover:scale-105 grayscale-75 hover:grayscale-0 transition-transform duration-500"
											/>
										</div>
									))}
								</div>

								{lightboxIndex !== null && (
									<Lightbox
										open
										index={lightboxIndex}
										close={() => setLightboxIndex(null)}
										slides={blogPost.blog_photos.map((img) => ({
											src: img.image,
											title: blogPost.title,
											description: blogPost.title,
										}))}
										plugins={[Thumbnails, Captions]}
									/>
								)}
							</div>

							{/* Share */}
							<div className="mt-12 pb-8 border-b border-gray-200">
								<h3 className="text-lg font-semibold mb-4 text-oki-gray-dark">
									Share this article:
								</h3>
								<div className="flex gap-4">
									<a
										href={`https://facebook.com/sharer/sharer.php?u=https://okisokariari.com/blog/${blogPost.slug}`}
										target="_blank"
										rel="noopener noreferrer"
										className="bg-[#1877F2] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
									>
										<Facebook size={18} />
									</a>
									<a
										href={`https://twitter.com/intent/tweet?text=${blogPost.title}&url=https://okisokariari.com/blog/${blogPost.slug}`}
										target="_blank"
										rel="noopener noreferrer"
										className="bg-[#1DA1F2] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
									>
										<Twitter size={18} />
									</a>
									<a
										href={`https://www.linkedin.com/shareArticle?mini=true&url=https://okisokariari.com/blog/${blogPost.slug}&title=${blogPost.title}`}
										target="_blank"
										rel="noopener noreferrer"
										className="bg-[#0A66C2] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
									>
										<Linkedin size={18} />
									</a>
								</div>
							</div>

							{/* Author Bio */}
							<div className="mt-8 bg-oki-gray-light p-6 rounded-lg">
								<div className="flex items-center gap-4 mb-4">
									<div className="w-16 h-16 bg-oki-blue-light rounded-full flex items-center justify-center text-white text-xl font-bold">
										{blogPost.user.name
											.split(" ")
											.map((name) => name[0])
											.join("")}
									</div>
									<div>
										<h3 className="font-bold text-oki-gray-dark">
											{blogPost.user.name}
										</h3>
										<p className="text-gray-600">Author</p>
									</div>
								</div>
								<p className="text-gray-600">
									An expert in the field with years of industry experience at
									O.K. Isokariari Nigeria Limited, committed to sharing
									knowledge and insights on engineering and construction
									excellence.
								</p>
							</div>
						</div>

						{/* Sidebar */}
						<aside className="lg:col-span-1">
							{/* Recent Posts */}
							<div className="bg-white rounded-lg shadow-md p-6 mb-8">
								<h3 className="text-xl font-semibold mb-6 text-oki-gray-dark border-b pb-3">
									Recent Posts
								</h3>
								<div className="space-y-6">
									{posts &&
										posts
											.filter((p) => p.id !== blogPost.id)
											.slice(0, 3)
											.map((recentPost) => (
												<div key={recentPost.id} className="flex gap-4">
													<div className="w-20 h-20 flex-shrink-0">
														<img
															src={recentPost.image}
															alt={recentPost.title}
															className="w-full h-full object-cover rounded"
														/>
													</div>
													<div>
														<Link
															href={`/blogs/${recentPost.slug}`}
															className="font-medium text-oki-gray-dark hover:text-oki-blue-dark transition-colors"
														>
															{recentPost.title}
														</Link>
														<p className="text-sm text-gray-500 mt-1">
															{formatDate(recentPost.created_at)}
														</p>
													</div>
												</div>
											))}
								</div>
							</div>

							{/* Categories */}
							<div className="bg-white rounded-lg shadow-md p-6 mb-8">
								<h3 className="text-xl font-semibold mb-6 text-oki-gray-dark border-b pb-3">
									Categories
								</h3>
								<ul className="space-y-2">
									{posts &&
										Array.from(new Set(posts.map((p) => p.category))).map(
											(category) => (
												<li key={category}>
													<Link
														href={`/blogs?category=${category.name}`}
														className="text-gray-600 hover:text-oki-blue-dark transition-colors flex items-center"
													>
														<ArrowLeft size={14} className="mr-2 rotate-180" />
														{category.name}
													</Link>
												</li>
											),
										)}
								</ul>
							</div>

							{/* CTA */}
							<div className="bg-oki-blue-dark rounded-lg shadow-md p-6 text-white">
								<h3 className="text-xl font-semibold mb-4">
									Need Expert Consultation?
								</h3>
								<p className="mb-6 text-white/80">
									Our team of experts is ready to assist you with your
									construction and engineering needs.
								</p>
								<Link href="/contact">
									<Button className="w-full bg-white text-oki-blue-dark hover:bg-white/90">
										Contact Us
									</Button>
								</Link>
							</div>
						</aside>
					</div>
				</div>
			</section>
		</WebLayout>
	);
};

export default BlogPost;
