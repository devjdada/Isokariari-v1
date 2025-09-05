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
		<div className="grid items-center grid-cols-2 overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
			<div className="relative overflow-hidden h-120">
				<img
					src={member.image}
					alt={member.name}
					className="object-cover object-center w-full h-full"
				/>
			</div>
			<ScrollArea className="h-[500px]">
				<div className="p-6">
					<h3 className="mb-1 text-xl font-semibold text-oki-gray-dark">
						{member.name}
					</h3>
					<p className="mb-1 font-medium text-oki-blue-dark">{member.title}</p>

					<div
						className="mb-4 text-gray-600"
						dangerouslySetInnerHTML={{
							__html: member?.about,
						}}
					/>

					<div className="flex space-x-3">
						{member.linkedin && (
							<a
								href={member.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-600 transition-colors hover:text-oki-blue-dark"
							>
								<Linkedin size={20} />
							</a>
						)}
						{member.twitter && (
							<a
								href={member.twitter}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-600 transition-colors hover:text-oki-blue-dark"
							>
								<Twitter size={20} />
							</a>
						)}
						{member.email && (
							<a
								href={`mailto:${member.email}`}
								className="text-gray-600 transition-colors hover:text-oki-blue-dark"
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
				<section className="py-20 pt-32 text-white team-hero-bg">
					<div className="container px-4 mx-auto">
						<div className="max-w-3xl">
							<h1 className="mb-6 text-4xl font-bold md:text-5xl">Our Team</h1>
							<p className="text-xl text-white/90">
								Meet the dedicated professionals who drive O.K. Isokariari
								Nigeria Limited forward with expertise, innovation, and
								commitment to excellence.
							</p>
						</div>
					</div>
				</section>

				<section className="py-16">
					<div className="container px-4 mx-auto">
						<h2 className="mb-12 text-3xl font-bold text-center text-oki-gray-dark">
							Executive Leadership
						</h2>
						<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
							{teams.map((member) => (
								<TeamMemberCard key={member.id} member={member} />
							))}
						</div>
					</div>
				</section>

				<section className="py-16 text-white bg-oki-blue-dark">
					<div className="container px-4 mx-auto text-center">
						<h2 className="mb-6 text-3xl font-bold">Join Our Team</h2>
						<p className="max-w-2xl mx-auto mb-8 text-lg text-white/80">
							We're always looking for talented professionals to join our
							growing team. Explore our current opportunities and become part of
							Nigeria's engineering excellence.
						</p>
						<Link
							href="/careers"
							className="inline-block px-8 py-4 font-semibold transition-colors bg-white rounded-md text-oki-blue-dark hover:bg-white/90"
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
