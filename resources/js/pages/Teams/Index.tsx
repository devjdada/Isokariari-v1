import { Head, Link } from "@inertiajs/react";
import Autoplay from "embla-carousel-autoplay";
import { Linkedin, Mail, Twitter } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import WebLayout from "@/layouts/WebLayout";
import { cn } from "@/lib/utils";
import type { TeamProps } from "@/types/TeamProps";

interface GalleryItem {
	id: number;
	image: string;
	title: string;
	description: string;
}

interface TeamsIndexProps {
	teams: TeamProps[];
	galleries: GalleryItem[];
}

const splitParagraphs = (text: string) => {
	return text.split(/\r?\n/).filter((paragraph) => paragraph.trim() !== "");
};

const TeamMemberCard = ({ member }: { member: TeamProps }) => {
	return (
		<div className="bg-white items-center grid grid-cols-2 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
			<div className="relative h-120 overflow-hidden">
				<img
					src={member.image}
					alt={member.name}
					className="w-full h-full object-cover object-center"
				/>
			</div>
			<ScrollArea className="h-[500px]">
				<div className="p-6">
					<h3 className="text-xl font-semibold mb-1 text-oki-gray-dark">
						{member.name}
					</h3>
					<p className="text-oki-blue-dark font-medium mb-1">{member.title}</p>

					{member.about &&
						splitParagraphs(member.about).map((paragraph, index) => (
							<p key={`about-me-${index}`} className="text-gray-600 mb-6">
								{paragraph}
							</p>
						))}

					<div className="flex space-x-3">
						{member.linkedin && (
							<a
								href={member.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-600 hover:text-oki-blue-dark transition-colors"
							>
								<Linkedin size={20} />
							</a>
						)}
						{member.twitter && (
							<a
								href={member.twitter}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-600 hover:text-oki-blue-dark transition-colors"
							>
								<Twitter size={20} />
							</a>
						)}
						{member.email && (
							<a
								href={`mailto:${member.email}`}
								className="text-gray-600 hover:text-oki-blue-dark transition-colors"
							>
								<Mail size={20} />
							</a>
						)}
					</div>
				</div>
			</ScrollArea>
		</div>
	);
};

const TeamPage = ({ teams, galleries }: TeamsIndexProps) => {
	const [bgImage, setBgImage] = useState<string>("");

	const fallbackImage = "/images/logo.png"; // Use your own fallback image URL

	useEffect(() => {
		let intervalId;

		if (Array.isArray(galleries) && galleries.length > 0) {
			const validImages = galleries
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
	}, [galleries]);

	return (
		<WebLayout>
			<Head title="Our Teams" />

			<style>{`
				.team-hero-bg {
					background-image: linear-gradient(
							to right, rgba(0, 70, 173, 0.85), rgba(0, 160, 233, 0.85)
						),
						url(${bgImage});
					background-size: cover;
					background-position: center;
				}
			`}</style>
			<div>
				<section className="team-hero-bg text-white py-20 pt-32">
					<div className="container mx-auto px-4">
						<div className="max-w-3xl">
							<h1 className="text-4xl md:text-5xl font-bold mb-6">Our Team</h1>
							<p className="text-xl text-white/90">
								Meet the dedicated professionals who drive O.K. Isokariari
								Nigeria Limited forward with expertise, innovation, and
								commitment to excellence.
							</p>
						</div>
					</div>
				</section>

				<section className="py-16">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-bold mb-12 text-center text-oki-gray-dark">
							Executive Leadership
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{teams.map((member) => (
								<TeamMemberCard key={member.id} member={member} />
							))}
						</div>
					</div>
				</section>

				<section className="py-16 bg-oki-blue-dark text-white">
					<div className="container mx-auto px-4 text-center">
						<h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
						<p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
							We're always looking for talented professionals to join our
							growing team. Explore our current opportunities and become part of
							Nigeria's engineering excellence.
						</p>
						<Link
							href="/careers"
							className="inline-block bg-white text-oki-blue-dark hover:bg-white/90 font-semibold px-8 py-4 rounded-md transition-colors"
						>
							View Open Positions
						</Link>
					</div>
				</section>
			</div>
		</WebLayout>
	);
};

export default TeamPage;
