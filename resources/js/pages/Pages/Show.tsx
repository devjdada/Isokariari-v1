import { Head, Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import { Button } from "@/components/ui/button";
import WebLayout from "@/layouts/WebLayout";
import type { BlogProps } from "@/types/BlogsProps";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { cn } from "@/lib/utils";

interface PageImage {
	id: number;
	image: string;
	pageId: number;
}

interface PageProps {
	id: number;
	title: string;
	contents: string;
	image: string | null;
	slug: string;
	more: string | null;
	images: PageImage[]; // Assuming this is the relationship name
}

interface PageDetailProps {
	page: PageProps;
	posts: BlogProps[];
}

const PageDetail = ({ page, posts }: PageDetailProps) => {
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

	const splitParagraphs = (text: string) => {
		if (!text) return [];
		return text.split(/\r?\n/).filter((paragraph) => paragraph.trim() !== "");
	};

	return (
		<WebLayout>
			<Head title={page.title} />

			{/* Hero Section */}
			<section
				className="relative py-24"
				style={{
					backgroundImage: `url(${page.image})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div className="absolute inset-0 bg-oki-blue-dark/75"></div>
				<div className="container pt-20 mx-auto px-4 relative z-10">
					<Link
						href="/pages"
						className="inline-flex items-center text-white/90 hover:text-white mb-6"
					>
						<ArrowLeft size={16} className="mr-2" />
						<span>Back to Pages</span>
					</Link>
					<h1 className="text-4xl md:text-5xl font-bold mb-6 text-white max-w-4xl">
						{page.title}
					</h1>
					<div className="flex flex-wrap items-center gap-6 text-white/80"></div>
				</div>
			</section>

			{/* Page Content */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
						<div className="lg:col-span-2">
							<div className="prose prose-lg max-w-none">
								<h2 className="text-2xl font-semibold mb-4">{page.title}</h2>
								{page.image && (
									<img src={page.image} alt={page.title} title={page.title} />
								)}
								<div
									className="prose lg:prose-xl max-w-none"
									dangerouslySetInnerHTML={{
										__html: page.contents || "",
									}}
								/>
							</div>

							{page.images && page.images.length > 0 && (
								<div className="p-4">
									<h3 className="text-2xl font-bold mb-6 text-oki-gray-dark">
										Page Gallery
									</h3>
									<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
										{page.images.map((image, index) => (
											<div
												key={image.id}
												className={cn(
													"overflow-hidden rounded-lg h-64 cursor-pointer",
													index === 0 &&
														"md:col-span-2 md:row-span-2 h-64 md:h-full",
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
													alt={`${page.title} - Image ${index + 1}`}
													className="w-full h-full object-cover hover:scale-105 grayscale hover:grayscale-0 transition-transform duration-500"
												/>
											</div>
										))}
									</div>

									{lightboxIndex !== null && (
										<Lightbox
											open
											index={lightboxIndex}
											close={() => setLightboxIndex(null)}
											slides={page.images.map((img) => ({
												src: img.image,
												title: page.title,
												description: page.title,
											}))}
											plugins={[Thumbnails, Captions]}
										/>
									)}
								</div>
							)}
						</div>

						{/* Sidebar */}
						<aside className="lg:col-span-1">
							{/* Recent Posts */}
							<div className="bg-white rounded-lg shadow-md p-6 mb-8">
								<h3 className="text-xl font-semibold mb-6 text-oki-gray-dark border-b pb-3">
									Recent Posts
								</h3>
								<div className="space-y-6">
									{posts
										.filter((p) => p.id !== page.id) // Filter out current page if it's also a blog post (unlikely)
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
														{new Date(
															recentPost.created_at,
														).toLocaleDateString()}
													</p>
												</div>
											</div>
										))}
								</div>
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

export default PageDetail;
