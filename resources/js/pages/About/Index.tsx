import { Head, Link, usePage } from "@inertiajs/react";
import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";
import {
	BookOpen,
	Globe,
	Grid,
	Heart,
	Target,
	Trophy,
	Users,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ClientsCarousel from "@/components/home/ClientsCarousel";
import ProjectImageSlider from "@/components/home/ProjectImageSlider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import WebLayout from "@/layouts/WebLayout";
import { cn } from "@/lib/utils";
import type { CompanyInfo } from "@/types";
import type { ProjectsProps } from "@/types/ProjectsProps";
import type { TeamProps } from "@/types/TeamProps";

interface AboutIndexProps {
	about: CompanyInfo | null;
	teams: TeamProps[];
	projects: ProjectsProps[];
	galleries: any[];
	clients: any[];
}

const About = ({
	about,
	teams,
	projects,
	galleries,
	clients,
}: AboutIndexProps) => {
	const [selectedMember, setSelectedMember] = useState<TeamProps | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const fadeIn = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6 },
		},
	};

	const staggerContainer = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const dialogVariants = {
		hidden: {
			opacity: 0,
			y: 20,
			scale: 0.95,
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				type: "spring",
				damping: 25,
				stiffness: 300,
			},
		},
		exit: {
			opacity: 0,
			y: 20,
			transition: { duration: 0.2 },
		},
	};

	const overlayVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	};

	const splitParagraphs = (text: string) => {
		return text.split(/\r?\n/).filter((paragraph) => paragraph.trim() !== "");
	};

	const plugin = useRef(Autoplay({ delay: 6300, stopOnInteraction: false }));

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
				}, 5000); // change every 3 seconds
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

            <Head>
                <title>About Us - O.K. Isokariari Nigeria Limited (O.K.I)</title>
                <meta name="description" content="Learn more about O.K. Isokariari Nigeria Limited (O.K.I), a leading engineering, procurement, and construction company. Discover our purpose, vision, mission, core values, and meet our top management team." />
                <meta name="keywords" content="About O.K.I, O.K. Isokariari Nigeria Limited, Engineering Company, Procurement Services, Construction Company, Company History, Company Vision, Company Mission, Core Values, Top Management, Leadership Team" />
                <meta name="author" content="O.K. Isokariari Nigeria Limited (O.K.I)" />
                <meta property="og:title" content="About Us - O.K. Isokariari Nigeria Limited (O.K.I)" />
            </Head>

			<style>{`
				.about-hero-bg {
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
			<div className="">
				{/* Hero Section */}
				<section className="py-20 pt-32 text-white about-hero-bg">
					<div className="container px-4 mx-auto">
						<motion.div
							className="max-w-3xl"
							initial="hidden"
							animate="visible"
							variants={fadeIn}
						>
							<h1 className="mb-6 text-4xl font-bold md:text-5xl">About Us</h1>
							{about?.about && (
								<p
									className="mb-4 text-xl leading-relaxed text-white/90"
									dangerouslySetInnerHTML={{ __html: about.about }}
								/>
							)}
						</motion.div>
					</div>
				</section>

				{/* Purpose, Vision & Mission Section */}
				<section className="py-16 bg-gradient-to-b from-oki-gray-light to-white">
					<div className="container px-4 mx-auto">
						<motion.div
							className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
							variants={staggerContainer}
							initial="hidden"
							animate="visible"
						>
							<motion.div
								className="p-8 bg-white border-t-4 rounded-lg shadow-lg border-oki-blue-dark"
								variants={fadeIn}
							>
								<div className="flex items-center mb-6">
									<Heart className="w-8 h-8 mr-3 text-oki-blue-dark" />
									<h2 className="text-2xl font-bold text-oki-gray-dark">
										Our Purpose
									</h2>
								</div>
								{about?.purpose && (
									<p
										className="text-gray-600"
										dangerouslySetInnerHTML={{ __html: about.purpose }}
									/>
								)}
							</motion.div>

							<motion.div
								className="p-8 bg-white border-t-4 rounded-lg shadow-lg border-oki-blue-light"
								variants={fadeIn}
							>
								<div className="flex items-center mb-6">
									<Target className="w-8 h-8 mr-3 text-oki-blue-light" />
									<h2 className="text-2xl font-bold text-oki-gray-dark">
										Our Vision
									</h2>
								</div>
								{about?.vision && (
									<p
										className="text-gray-600"
										dangerouslySetInnerHTML={{ __html: about.vision }}
									/>
								)}
							</motion.div>

							<motion.div
								className="p-8 bg-white border-t-4 rounded-lg shadow-lg border-oki-red"
								variants={fadeIn}
							>
								<div className="flex items-center mb-6">
									<BookOpen className="w-8 h-8 mr-3 text-oki-red" />
									<h2 className="text-2xl font-bold text-oki-gray-dark">
										Our Mission
									</h2>
								</div>
								{about?.mission && (
									<p
										className="text-gray-600"
										dangerouslySetInnerHTML={{ __html: about.mission }}
									/>
								)}
							</motion.div>

							<motion.div
								className="p-8 bg-white border-t-4 rounded-lg shadow-lg border-violet-500"
								variants={fadeIn}
							>
								<div className="flex items-center mb-6">
									<Grid className="w-8 h-8 mr-3 text-violet-500" />
									<h2 className="text-2xl font-bold text-oki-gray-dark">
										Our Core Values
									</h2>
								</div>
								{about?.value && (
									<p
										className="text-gray-600"
										dangerouslySetInnerHTML={{ __html: about.value }}
									/>
								)}
							</motion.div>
						</motion.div>
					</div>
				</section>

				{/* History Section */}
				<section className="py-16">
					<div className="container px-4 mx-auto">
						<div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.7 }}
							>
								<h2 className="mb-6 text-3xl font-bold text-oki-gray-dark">
									Our History
								</h2>

								{about?.history &&
									splitParagraphs(about.history).map((paragraph, index) => (
										<p key={`purpose-${index}`} className="mb-5 text-gray-600">
											{paragraph}
										</p>
									))}
							</motion.div>
							<section className=" bg-oki-gray-light">
								<div className="container px-4 mx-auto">
									<Carousel
										opts={{ align: "start", loop: true }}
										plugins={[plugin.current]}
										className="w-full "
									>
										<CarouselContent className="-ml-4">
											{galleries.map((eq) => (
												<CarouselItem
													key={`ClientCarousel-${eq.id}`}
													className=""
												>
													<motion.div
														initial={{ opacity: 0, x: 150 }}
														viewport={{ once: false }}
														whileInView={{ opacity: 1, x: 0 }}
														className="relative flex items-center justify-center transition-shadow duration-500 cursor-pointer hover:shadow-md"
													>
														<img
															src={eq.image}
															alt={`${eq.gallery} logo`}
															className="w-full rounded-lg shadow-xl h-80"
														/>
													</motion.div>
												</CarouselItem>
											))}
										</CarouselContent>
										{/* <CarouselPrevious />
											<CarouselNext /> */}
									</Carousel>
								</div>
							</section>
						</div>
					</div>
				</section>

				{/* Meet Our Top Management Section */}
				<section className="py-16 bg-oki-gray-light">
					<div className="container px-4 mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="mb-12 text-center"
						>
							<h2 className="mb-4 text-3xl font-bold text-oki-gray-dark">
								MEET OUR TOP MANAGEMENT
							</h2>
							<p className="max-w-3xl mx-auto text-gray-600">
								At O.K. Isokariari Nigeria Limited (O.K.I), our success is
								driven by the expertise and leadership of our top management
								team. We are proud to introduce the individuals who spearhead
								our company's vision, ensuring the delivery of exceptional
								engineering, procurement, and construction solutions.
							</p>
						</motion.div>

						<motion.div
							variants={staggerContainer}
							initial="hidden"
							animate="visible"
							className="grid grid-cols-2 gap-8 md:grid-cols-4"
						>
							{teams.map((member) => (
								<motion.div
									key={`team-member-${member.id}`}
									variants={fadeIn}
									viewport={{ once: false }}
									className="relative overflow-hidden transition-shadow bg-white rounded-lg shadow-lg hover:shadow-xl group"
								>
									{/* Image container with scaling effect on hover */}
									<div className="relative overflow-hidden h-86">
										<img
											src={member.image}
											alt={member.name}
											className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-105"
										/>
									</div>

									{/* Info overlay with smooth slide-up animation */}
									<div className="absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent group-hover:opacity-100">
										<div className="transition-transform duration-300 transform translate-y-8 group-hover:translate-y-0">
											<h3 className="text-2xl font-bold text-white">
												{member.name}
											</h3>
											<p className="mb-4 text-lg font-medium text-rose-500">
												{member.title}
											</p>
											<Button
												variant="outline"
												className="mt-2 border-white text-rose-500 hover:text-white hover:bg-white/20"
												onClick={(e) => {
													e.stopPropagation();
													setSelectedMember(member);
													setIsDialogOpen(true);
												}}
											>
												Read More
											</Button>
										</div>
									</div>
								</motion.div>
							))}
						</motion.div>
					</div>
				</section>

				{/* Add this dialog component at the bottom of your return statement */}
				<AnimatePresence>
					{isDialogOpen && (
						<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
							<motion.div
								className="fixed inset-0 z-50 bg-white"
								variants={overlayVariants}
								initial="hidden"
								animate="visible"
								exit="hidden"
							>
								<DialogContent className="sm:max-w-[800px] bg-white  overflow-hidden">
									<ScrollArea className="max-h-[700px] overflow-y-auto pr-2">
										<motion.div
											variants={dialogVariants}
											initial="hidden"
											animate="visible"
											exit="exit"
										>
											<motion.div
												className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ delay: 0.2 }}
											>
												<motion.div
													className="flex justify-center"
													initial={{ scale: 0.9 }}
													animate={{ scale: 1 }}
													transition={{ type: "spring", delay: 0.1 }}
												>
													<img
														src={selectedMember?.image}
														alt={selectedMember?.name}
														className="object-cover shadow-lg border-1 border-oki-blue-light"
													/>
												</motion.div>

												<motion.div
													className="justify-center text-gray-700"
													initial={{ y: 10, opacity: 0 }}
													animate={{ y: 0, opacity: 1 }}
													transition={{ delay: 0.3 }}
												>
													<h3 className="text-2xl font-bold ">
														{selectedMember?.name}
													</h3>
													<p className="mb-4 text-lg font-medium text-oki-blue-light">
														{selectedMember?.title}
													</p>

													<div
														className="mb-4 text-gray-600"
														dangerouslySetInnerHTML={{
															__html: selectedMember?.about,
														}}
													/>
												</motion.div>
											</motion.div>
										</motion.div>
									</ScrollArea>
								</DialogContent>
							</motion.div>
						</Dialog>
					)}
				</AnimatePresence>
				{/* Core Values Section */}
				<section className="py-16">
					<div className="container px-4 mx-auto">
						<motion.h2
							className="mb-12 text-3xl font-bold text-center text-oki-gray-dark"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							We Stands for
						</motion.h2>
						<motion.div
							className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
							variants={staggerContainer}
							initial="hidden"
							animate="visible"
						>
							<motion.div
								className="p-6 transition-shadow bg-white border-b-4 rounded-lg shadow-md hover:shadow-lg border-oki-blue-dark"
								variants={fadeIn}
							>
								<div className="flex items-center justify-center mb-4">
									<Trophy className="w-12 h-12 text-oki-blue-dark" />
								</div>
								<h3 className="mb-3 text-xl font-semibold text-center text-oki-gray-dark">
									Excellence
								</h3>
								<p className="text-center text-gray-600">
									We strive for excellence in every aspect of our work, from
									project planning to execution and delivery.
								</p>
							</motion.div>
							<motion.div
								className="p-6 transition-shadow bg-white border-b-4 rounded-lg shadow-md hover:shadow-lg border-oki-blue-dark"
								variants={fadeIn}
							>
								<div className="flex items-center justify-center mb-4">
									<Users className="w-12 h-12 text-oki-blue-dark" />
								</div>
								<h3 className="mb-3 text-xl font-semibold text-center text-oki-gray-dark">
									Integrity
								</h3>
								<p className="text-center text-gray-600">
									We operate with honesty, transparency, and ethical conduct in
									all our business dealings.
								</p>
							</motion.div>
							<motion.div
								className="p-6 transition-shadow bg-white border-b-4 rounded-lg shadow-md hover:shadow-lg border-oki-blue-dark"
								variants={fadeIn}
							>
								<div className="flex items-center justify-center mb-4">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-12 h-12 text-oki-blue-dark"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<circle cx="12" cy="12" r="10" />
										<line x1="12" y1="8" x2="12" y2="12" />
										<line x1="12" y1="16" x2="12.01" y2="16" />
									</svg>
								</div>
								<h3 className="mb-3 text-xl font-semibold text-center text-oki-gray-dark">
									Innovation
								</h3>
								<p className="text-center text-gray-600">
									We embrace innovative approaches and technologies to deliver
									superior results.
								</p>
							</motion.div>
							<motion.div
								className="p-6 transition-shadow bg-white border-b-4 rounded-lg shadow-md hover:shadow-lg border-oki-blue-dark"
								variants={fadeIn}
							>
								<div className="flex items-center justify-center mb-4">
									<Globe className="w-12 h-12 text-oki-blue-dark" />
								</div>
								<h3 className="mb-3 text-xl font-semibold text-center text-oki-gray-dark">
									Sustainability
								</h3>
								<p className="text-center text-gray-600">
									We are committed to environmentally responsible practices and
									sustainable development.
								</p>
							</motion.div>
						</motion.div>
					</div>
				</section>

				{/* Clients Carousel Section */}
				<ClientsCarousel clients={clients} />

				{/* CTA Section */}
				<section className="py-16 text-white bg-gradient-to-r from-oki-blue-dark to-oki-blue-light">
					<div className="container px-4 mx-auto text-center">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7 }}
							viewport={{ once: false }}
						>
							<h2 className="mb-6 text-3xl font-bold">
								Ready to Work With Us?
							</h2>
							<p className="max-w-2xl mx-auto mb-8 text-lg text-white/80">
								Whether you're looking for a construction partner, career
								opportunities, or more information about our services, we'd love
								to hear from you.
							</p>
							<div className="flex flex-col justify-center gap-4 sm:flex-row">
								<Link href="/contact">
									<Button className="px-8 py-6 bg-white text-oki-blue-dark hover:bg-white/90">
										Contact Us
									</Button>
								</Link>
								<Link href="/team">
									<Button
										variant="outline"
										className="px-8 py-6 text-white bg-oki-red hover:bg-white"
									>
										Meet Our Team
									</Button>
								</Link>
							</div>
						</motion.div>
					</div>
				</section>
			</div>
		</WebLayout>
	);
};

export default About;
