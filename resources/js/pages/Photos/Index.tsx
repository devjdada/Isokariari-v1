import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import WebLayout from "@/layouts/WebLayout";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Photo {
	id: number;
	gallery: string | null;
	image: string;
	description: string | null;
}

interface PhotosIndexProps {
	photos: Photo[];
}

const Gallery = ({ photos }: PhotosIndexProps) => {
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
	const [bgImage, setBgImage] = useState<string>("");

	const fallbackImage = "/images/logo.png"; // Use your own fallback image URL
	useEffect(() => {
		let intervalId;

		if (Array.isArray(photos) && photos.length > 0) {
			const validImages = photos
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
	}, [photos]);

	const slides = photos.map((photo) => ({
		src: photo.image,
		title: photo.description || "",
		description: photo.description || "",
	}));

	const uniqueGalleries = [
		"all",
		...Array.from(
			new Set(photos.map((photo) => photo.gallery || "Uncategorized")),
		),
	];
	const [filter, setFilter] = useState("all");

	const filteredPhotos = photos.filter((photo) => {
		if (filter === "all") return true;
		return (photo.gallery || "Uncategorized") === filter;
	});

	return (
		<WebLayout>
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
			<Head title="Gallery" />

			<section className="team-hero-bg text-white py-20 pt-32">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl">
						<h1 className="text-4xl md:text-5xl font-bold mb-6">Our Gallery</h1>
						<p className="text-xl text-white/90">
							Explore our collection of high-quality images showcasing our
							projects, equipment, and team.
						</p>
					</div>
				</div>
			</section>

			<section className="py-8 bg-oki-gray-light">
				<div className="container mx-auto px-4">
					<div className="flex flex-wrap justify-center gap-4">
						{uniqueGalleries.map((galleryName) => (
							<Button
								key={galleryName}
								className={cn(
									"px-4 py-2 rounded-full text-sm font-medium transition-colors",
									filter === galleryName
										? "bg-oki-blue-dark text-white"
										: "bg-white text-oki-gray-dark hover:bg-gray-100",
								)}
								onClick={() => setFilter(galleryName)}
							>
								{galleryName === "all" ? "All" : galleryName}
							</Button>
						))}
					</div>
				</div>
			</section>

			<section className="py-16">
				<div className="container mx-auto px-4">
					{filteredPhotos.length > 0 ? (
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{filteredPhotos.map((photo, index) => (
								<div
									key={photo.id}
									className="overflow-hidden rounded-lg shadow-md"
								>
									<img
										src={photo.image}
										alt={photo.description || "Gallery Image"}
										className="w-full h-48 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
										onClick={() => setLightboxIndex(index)}
									/>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-12">
							<h3 className="text-2xl font-semibold text-oki-gray-dark mb-4">
								No photos found
							</h3>
							<p className="text-gray-600">
								There are no photos in this gallery at the moment.
							</p>
						</div>
					)}
					{lightboxIndex !== null && photos.length > 0 && (
						<Lightbox
							open
							index={lightboxIndex}
							close={() => setLightboxIndex(null)}
							slides={slides}
							plugins={[Thumbnails, Captions]}
						/>
					)}
				</div>
			</section>
		</WebLayout>
	);
};

export default Gallery;
