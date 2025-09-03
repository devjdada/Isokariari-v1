import { Head, Link, usePage } from "@inertiajs/react";
import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";
import {
	BookOpen,
	Briefcase,
	Building,
	FileText,
	Globe,
	Grid,
	Heart,
	Target,
	Trophy,
	UserRound,
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
			<Head title="About" />

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
				<section className="about-hero-bg text-white py-20 pt-32">
					<div className="container mx-auto px-4">
						<motion.div
							className="max-w-3xl"
							initial="hidden"
							animate="visible"
							variants={fadeIn}
						>
							<h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
							{about?.about && (
								<p
									className="text-xl text-white/90 leading-relaxed mb-4"
									dangerouslySetInnerHTML={{ __html: about.about }}
								/>
							)}
						</motion.div>
					</div>
				</section>

				{/* Purpose, Vision & Mission Section */}
				<section className="py-16 bg-gradient-to-b from-oki-gray-light to-white">
					<div className="container mx-auto px-4">
						<motion.div
							className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4"
							variants={staggerContainer}
							initial="hidden"
							animate="visible"
						>
							<motion.div
								className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-oki-blue-dark"
								variants={fadeIn}
							>
								<div className="flex items-center mb-6">
									<Heart className="h-8 w-8 text-oki-blue-dark mr-3" />
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
								className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-oki-blue-light"
								variants={fadeIn}
							>
								<div className="flex items-center mb-6">
									<Target className="h-8 w-8 text-oki-blue-light mr-3" />
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
								className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-oki-red"
								variants={fadeIn}
							>
								<div className="flex items-center mb-6">
									<BookOpen className="h-8 w-8 text-oki-red mr-3" />
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
								className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-violet-500"
								variants={fadeIn}
							>
								<div className="flex items-center mb-6">
									<Grid className="h-8 w-8 text-violet-500 mr-3" />
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
					<div className="container mx-auto px-4">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.7 }}
							>
								<h2 className="text-3xl font-bold mb-6 text-oki-gray-dark">
									Our History
								</h2>

								{about?.history &&
									splitParagraphs(about.history).map((paragraph, index) => (
										<p key={`purpose-${index}`} className="text-gray-600 mb-5">
											{paragraph}
										</p>
									))}
							</motion.div>
							<section className=" bg-oki-gray-light">
								<div className="container mx-auto px-4">
									<Carousel
										opts={{ align: "start", loop: true }}
										plugins={[plugin.current]}
										className="w-full "
									>
										<CarouselContent className="-ml-4">
											{galleries.map((eq) => (
												<CarouselItem
													key={`ClientCarousel-${eq.id}`}
													className=" "
												>
													<motion.div
														initial={{ opacity: 0, x: 150 }}
														viewport={{ once: false }}
														whileInView={{ opacity: 1, x: 0 }}
														className="flex relative items-center justify-center hover:shadow-md transition-shadow duration-500 cursor-pointer"
													>
														<img
															src={eq.image}
															alt={`${eq.gallery} logo`}
															className="rounded-lg shadow-xl w-full h-80"
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
					<div className="container mx-auto px-4">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="text-center mb-12"
						>
							<h2 className="text-3xl font-bold mb-4 text-oki-gray-dark">
								MEET OUR TOP MANAGEMENT
							</h2>
							<p className="text-gray-600 max-w-3xl mx-auto">
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
							className="grid grid-cols-2 md:grid-cols-4  gap-8"
						>
							{teams.map((member, index) => (
								<motion.div
									key={index}
									variants={fadeIn}
									viewport={{ once: false }}
									className="bg-white relative rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
								>
									{/* Image container with scaling effect on hover */}
									<div className="h-86 overflow-hidden relative">
										<img
											src={member.image}
											alt={member.name}
											className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
										/>
									</div>

									{/* Info overlay with smooth slide-up animation */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
										<div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
											<h3 className="text-2xl font-bold text-white">
												{member.name}
											</h3>
											<p className="text-rose-500 font-medium text-lg mb-4">
												{member.title}
											</p>
											<Button
												variant="outline"
												className="text-rose-500 border-white hover:text-white hover:bg-white/20 mt-2"
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
								className="fixed inset-0 bg-white  z-50"
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
												className="grid sm:grid-cols-2 grid-cols-1 gap-4 py-4"
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
														className=" object-cover border-1 border-oki-blue-light shadow-lg"
													/>
												</motion.div>

												<motion.div
													className="text-gray-700  justify-center"
													initial={{ y: 10, opacity: 0 }}
													animate={{ y: 0, opacity: 1 }}
													transition={{ delay: 0.3 }}
												>
													<h3 className="text-2xl font-bold ">
														{selectedMember?.name}
													</h3>
													<p className="text-oki-blue-light font-medium text-lg mb-4">
														{selectedMember?.title}
													</p>
													{selectedMember.about &&
														splitParagraphs(selectedMember.about).map(
															(paragraph, index) => (
																<p
																	key={`about-me-${index}`}
																	className=" leading-relaxed mb-4"
																>
																	{paragraph}
																</p>
															),
														)}
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
					<div className="container mx-auto px-4">
						<motion.h2
							className="text-3xl font-bold mb-12 text-center text-oki-gray-dark"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							We Stands for
						</motion.h2>
						<motion.div
							className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
							variants={staggerContainer}
							initial="hidden"
							animate="visible"
						>
							<motion.div
								className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-b-4 border-oki-blue-dark"
								variants={fadeIn}
							>
								<div className="flex items-center justify-center mb-4">
									<Trophy className="text-oki-blue-dark h-12 w-12" />
								</div>
								<h3 className="text-xl font-semibold mb-3 text-oki-gray-dark text-center">
									Excellence
								</h3>
								<p className="text-gray-600 text-center">
									We strive for excellence in every aspect of our work, from
									project planning to execution and delivery.
								</p>
							</motion.div>
							<motion.div
								className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-b-4 border-oki-blue-dark"
								variants={fadeIn}
							>
								<div className="flex items-center justify-center mb-4">
									<Users className="text-oki-blue-dark h-12 w-12" />
								</div>
								<h3 className="text-xl font-semibold mb-3 text-oki-gray-dark text-center">
									Integrity
								</h3>
								<p className="text-gray-600 text-center">
									We operate with honesty, transparency, and ethical conduct in
									all our business dealings.
								</p>
							</motion.div>
							<motion.div
								className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-b-4 border-oki-blue-dark"
								variants={fadeIn}
							>
								<div className="flex items-center justify-center mb-4">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-12 w-12 text-oki-blue-dark"
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
								<h3 className="text-xl font-semibold mb-3 text-oki-gray-dark text-center">
									Innovation
								</h3>
								<p className="text-gray-600 text-center">
									We embrace innovative approaches and technologies to deliver
									superior results.
								</p>
							</motion.div>
							<motion.div
								className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-b-4 border-oki-blue-dark"
								variants={fadeIn}
							>
								<div className="flex items-center justify-center mb-4">
									<Globe className="text-oki-blue-dark h-12 w-12" />
								</div>
								<h3 className="text-xl font-semibold mb-3 text-oki-gray-dark text-center">
									Sustainability
								</h3>
								<p className="text-gray-600 text-center">
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
				<section className="py-16 bg-gradient-to-r from-oki-blue-dark to-oki-blue-light text-white">
					<div className="container mx-auto px-4 text-center">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7 }}
							viewport={{ once: false }}
						>
							<h2 className="text-3xl font-bold mb-6">
								Ready to Work With Us?
							</h2>
							<p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
								Whether you're looking for a construction partner, career
								opportunities, or more information about our services, we'd love
								to hear from you.
							</p>
							<div className="flex flex-col sm:flex-row justify-center gap-4">
								<Link href="/contact">
									<Button className="bg-white text-oki-blue-dark hover:bg-white/90 px-8 py-6">
										Contact Us
									</Button>
								</Link>
								<Link href="/team">
									<Button
										variant="outline"
										className="bg-oki-red text-white hover:bg-white px-8 py-6"
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
