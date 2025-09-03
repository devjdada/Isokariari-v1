import { Head, Link } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import {
	ArrowRight,
	Briefcase,
	Calendar,
	ChevronDown,
	ChevronUp,
	MapPin,
	Search,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import WebLayout from "@/layouts/WebLayout";
import { cn } from "@/lib/utils";
import type { PageProps } from "@/types";
import ApplyDialog from "./AplyDailog";

export interface JobListing {
	id: string;
	title: string;
	location: string;
	type: "Full-time" | "Part-time" | "Contract";
	department: string;
	posted_date: string; // Changed from postedDate to match Laravel snake_case
	description: string;
	responsibilities: string[];
	requirements: string[];
	closing_date: string; // Added closing_date
}

const offer: JobListing = {
	id: "0",
	title: "Send Open Application",
	location: "Send Open Application",
	type: "Full-time",
	department: "Send Open Application",
	posted_date: "Send Open Application",
	description: "Send Open Application",
	responsibilities: [],
	requirements: [],
	closing_date: "Send Open Application",
};

interface JobListingsIndexProps extends PageProps {
	jobListings: JobListing[];
	galleries: {
		id: string;
		image: string;
		title?: string;
		description?: string;
	}[];
}

const Careers = ({ jobListings, galleries }: JobListingsIndexProps) => {
	const [loading, setLoading] = useState(false); // Data is passed as prop, so no initial loading
	const [searchTerm, setSearchTerm] = useState("");
	const [locationFilter, setLocationFilter] = useState("all");
	const [departmentFilter, setDepartmentFilter] = useState("all");
	const [typeFilter, setTypeFilter] = useState("all");
	const [expandedJob, setExpandedJob] = useState<string | null>(null);

	const locations = useMemo(() => {
		return [
			"all",
			...Array.from(new Set(jobListings.map((job) => job.location))),
		];
	}, [jobListings]);

	const departments = useMemo(() => {
		return [
			"all",
			...Array.from(new Set(jobListings.map((job) => job.department))),
		];
	}, [jobListings]);

	const jobTypes = useMemo(() => {
		return ["all", ...Array.from(new Set(jobListings.map((job) => job.type)))];
	}, [jobListings]);

	const filteredJobs = jobListings.filter((job) => {
		const matchesSearch =
			job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			job.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesLocation =
			locationFilter === "all" || job.location === locationFilter;
		const matchesDepartment =
			departmentFilter === "all" || job.department === departmentFilter;
		const matchesType = typeFilter === "all" || job.type === typeFilter;

		return matchesSearch && matchesLocation && matchesDepartment && matchesType;
	});

	const toggleJobExpansion = (jobId: string) => {
		if (expandedJob === jobId) {
			setExpandedJob(null);
		} else {
			setExpandedJob(jobId);
		}
	};

	const getRandomImages = () => {
		if (galleries.length <= 3) return galleries;

		// Shuffle array and take first 15
		const shuffled = [...galleries].sort(() => 0.5 - Math.random());
		return shuffled.slice(0, 3);
	};

	const randomImages = getRandomImages();

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
				}, 8000); // change every 3 seconds
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
			<Head title="Careers">
				<meta
					name="description"
					content="Discover exciting career opportunities at O.K. Isokariari
                Nigeria Limited and become part of a team dedicated to
                engineering excellence and innovation."
				/>
				<meta name="author" content="O.K. Isokariari Nigeria Limited" />

				<meta
					property="og:title"
					content="Careers | Isokariari Nigeria Limited"
				/>
				<meta
					property="og:description"
					content="Discover exciting career opportunities at O.K. Isokariari
                Nigeria Limited and become part of a team dedicated to
                engineering excellence and innovation."
				/>
				<meta property="og:type" content="website" />
				<meta
					property="og:image"
					content="/lovable-uploads/913966a1-aabe-49b4-a605-333251687c87.png"
				/>

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@lovable_dev" />
				<meta
					name="twitter:image"
					content="/lovable-uploads/913966a1-aabe-49b4-a605-333251687c87.png"
				/>
			</Head>
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
				<section className="team-hero-bg text-white py-20 pt-32">
					<div className="container mx-auto px-4">
						<div className="max-w-3xl">
							<h1 className="text-4xl md:text-5xl font-bold mb-6">
								Join Our Team
							</h1>
							<p className="text-xl text-white/90">
								Discover exciting career opportunities at O.K. Isokariari
								Nigeria Limited and become part of a team dedicated to
								engineering excellence and innovation.
							</p>
						</div>
					</div>
				</section>

				<section className="py-16">
					<div className="container mx-auto px-4">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold mb-6 text-oki-gray-dark">
								Why Work With Us?
							</h2>
							<p className="text-lg text-gray-600 max-w-3xl mx-auto">
								At O.K. Isokariari Nigeria Limited, we offer more than just a
								job – we provide a career pathway with opportunities for growth,
								learning, and making a meaningful impact.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-4 gap-16">
							<div className="grid grid-cols-2  gap-3 col-span-2">
								<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
									<div className="text-4xl mb-4">🚀</div>
									<h3 className="text-xl font-semibold mb-3 text-oki-gray-dark">
										Career Growth
									</h3>
									<p className="text-gray-600">
										Clear advancement paths and opportunities for professional
										development at all levels.
									</p>
								</div>

								<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
									<div className="text-4xl mb-4">🎓</div>
									<h3 className="text-xl font-semibold mb-3 text-oki-gray-dark">
										Continuous Learning
									</h3>
									<p className="text-gray-600">
										Training programs, workshops, and education support to
										enhance your skills and knowledge.
									</p>
								</div>

								<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
									<div className="text-4xl mb-4">🌟</div>
									<h3 className="text-xl font-semibold mb-3 text-oki-gray-dark">
										Impactful Projects
									</h3>
									<p className="text-gray-600">
										Work on significant infrastructure projects that shape
										Nigeria's development and improve lives.
									</p>
								</div>

								<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
									<div className="text-4xl mb-4">👥</div>
									<h3 className="text-xl font-semibold mb-3 text-oki-gray-dark">
										Collaborative Culture
									</h3>
									<p className="text-gray-600">
										A supportive team environment that values diversity,
										innovation, and mutual respect.
									</p>
								</div>
							</div>
							<div className="col-span-2  relative h-full min-h-[500px]">
								<AnimatePresence>
									{randomImages.map((gallery, index) => (
										<motion.div
											key={gallery.id}
											className={cn(
												"absolute rounded-lg overflow-hidden shadow-lg",
												index === 0 && "w-2/4 right-10 top-0 z-10",
												index === 1 && "w-2/4 left-0 top-[160px] z-20",
												index === 2 && "w-2/5 right-28 top-2/3 z-30",
											)}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: index * 0.2 }}
										>
											<img
												src={gallery.image}
												alt={gallery.title || "Gallery image"}
												className="w-full h-full object-cover"
											/>
											<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
												<h3 className="text-white font-semibold">
													{gallery.title}
												</h3>
												<p className="text-white/80 text-sm line-clamp-1">
													{gallery.description}
												</p>
											</div>
										</motion.div>
									))}
								</AnimatePresence>
							</div>
						</div>
					</div>
				</section>

				<section className="py-16 bg-oki-gray-light">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-bold mb-8 text-oki-gray-dark">
							Current Opportunities
						</h2>

						<div className="bg-white rounded-lg shadow-md p-6 mb-8">
							<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
								<div className="relative">
									<Search
										className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
										size={18}
									/>
									<Input
										type="text"
										placeholder="Search jobs..."
										className="pl-10"
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
								</div>

								<div>
									<select
										className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-oki-blue-dark"
										value={locationFilter}
										onChange={(e) => setLocationFilter(e.target.value)}
									>
										<option key="all-location" value="all">
											All Locations
										</option>
										{locations
											.filter((loc) => loc !== "all")
											.map((location) => (
												<option key={`location-${location}`} value={location}>
													{location}
												</option>
											))}
									</select>
								</div>

								<div>
									<select
										className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-oki-blue-dark"
										value={departmentFilter}
										onChange={(e) => setDepartmentFilter(e.target.value)}
									>
										<option value="all">All Departments</option>
										{departments
											.filter((dept) => dept !== "all")
											.map((department) => (
												<option key={`dept-${department}`} value={department}>
													{department}
												</option>
											))}
									</select>
								</div>

								<div>
									<select
										className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-oki-blue-dark"
										value={typeFilter}
										onChange={(e) => setTypeFilter(e.target.value)}
									>
										<option value="all">All Job Types</option>
										{jobTypes
											.filter((type) => type !== "all")
											.map((jobType) => (
												<option key={`type-${jobType}`} value={jobType}>
													{jobType}
												</option>
											))}
									</select>
								</div>
							</div>
						</div>

						{loading ? (
							<motion.div
								className="space-y-4"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								{[...Array(3)].map((_, i) => (
									<div
										key={i}
										className="bg-white rounded-lg shadow-md p-6 animate-pulse h-40"
									/>
								))}
							</motion.div>
						) : filteredJobs.length > 0 ? (
							<motion.div
								className="space-y-6"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<AnimatePresence mode="popLayout">
									{filteredJobs.map((job, index) => (
										<motion.div
											key={job.id || `job-${index}`}
											className="bg-white rounded-lg shadow-md overflow-hidden"
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -20 }}
											transition={{ delay: index * 0.1, duration: 0.3 }}
											layout
										>
											<div
												className="p-6 cursor-pointer"
												onClick={() => toggleJobExpansion(job.id)}
											>
												<div className="flex flex-col md:flex-row md:justify-between md:items-center">
													<div className="mb-4 md:mb-0">
														<h3 className="text-xl font-semibold text-oki-gray-dark">
															{job.title}
														</h3>
														<p className="text-oki-blue-dark">
															{job.department}
														</p>
													</div>
													<div className="flex flex-wrap gap-3">
														<div className="flex items-center text-gray-600 text-sm">
															<MapPin size={14} className="mr-1" />
															<span>{job.location}</span>
														</div>
														<div className="flex items-center text-gray-600 text-sm">
															<Briefcase size={14} className="mr-1" />
															<span>{job.type}</span>
														</div>
														{/* <div className="flex items-center text-gray-600 text-sm">
                                <Calendar size={14} className="mr-1" />
                                <span>Posted: {job.posted_date}</span>
                              </div> */}
														<div className="flex items-center text-gray-600 text-sm">
															<Calendar size={14} className="mr-1" />
															<span>Closing: {job.closing_date}</span>
														</div>
														<Button
															variant="ghost"
															size="icon"
															className="ml-2"
														>
															{expandedJob === job.id ? (
																<ChevronUp size={20} />
															) : (
																<ChevronDown size={20} />
															)}
														</Button>
													</div>
												</div>
											</div>
											<div
												className={cn(
													"overflow-hidden transition-all duration-300",
													expandedJob === job.id
														? "max-h-[2000px] opacity-100"
														: "max-h-0 opacity-0",
												)}
											>
												<div className="p-6 border-t border-gray-200">
													<div className="mb-6">
														<h4 className="text-lg font-semibold mb-3 text-oki-gray-dark">
															Description:
														</h4>
														<div
															className="list-disc pl-5 space-y-2"
															dangerouslySetInnerHTML={{
																__html: job.description,
															}}
														/>
													</div>
													<div className="mb-6">
														<h4 className="text-lg font-semibold mb-3 text-oki-gray-dark">
															Key Responsibilities:
														</h4>

														<div
															className="list-disc pl-5 space-y-2"
															dangerouslySetInnerHTML={{
																__html: job.responsibilities,
															}}
														/>
													</div>
													<div className="mb-6">
														<h4 className="text-lg font-semibold mb-3 text-oki-gray-dark">
															Requirements:
														</h4>

														<div
															className="list-disc pl-5 space-y-2"
															dangerouslySetInnerHTML={{
																__html: job.requirements,
															}}
														/>
													</div>
													<ApplyDialog label="Apply Now" job={job} />
												</div>
											</div>
										</motion.div>
									))}
								</AnimatePresence>
							</motion.div>
						) : (
							<motion.div
								className="bg-white rounded-lg shadow-md p-8 text-center"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<h3 className="text-xl font-semibold mb-4 text-oki-gray-dark">
									No positions found
								</h3>
								<p className="text-gray-600 mb-6">
									There are no positions matching your search criteria at this
									time.
								</p>
								<Button
									variant="outline"
									className="border-oki-blue-dark text-oki-blue-dark hover:bg-oki-blue-dark hover:text-white"
									onClick={() => {
										setSearchTerm("");
										setLocationFilter("all");
										setDepartmentFilter("all");
										setTypeFilter("all");
									}}
								>
									Clear Filters
								</Button>
							</motion.div>
						)}
					</div>
				</section>

				<section className="py-16">
					<div className="container mx-auto px-4">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold mb-6 text-oki-gray-dark">
								Our Application Process
							</h2>
							<p className="text-lg text-gray-600 max-w-3xl mx-auto">
								We've designed a straightforward application process to help you
								find the right opportunity with O.K. Isokariari Nigeria Limited.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
							<div className="bg-white rounded-lg shadow-md p-6 relative">
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-oki-blue-dark text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
									1
								</div>
								<h3 className="text-xl font-semibold mb-3 text-oki-gray-dark text-center mt-4">
									Application
								</h3>
								<p className="text-gray-600 text-center">
									Submit your application through our online portal with your
									resume and cover letter.
								</p>
							</div>

							<div className="bg-white rounded-lg shadow-md p-6 relative">
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-oki-blue-dark text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
									2
								</div>
								<h3 className="text-xl font-semibold mb-3 text-oki-gray-dark text-center mt-4">
									Screening
								</h3>
								<p className="text-gray-600 text-center">
									Our HR team reviews applications and conducts initial phone
									interviews with promising candidates.
								</p>
							</div>

							<div className="bg-white rounded-lg shadow-md p-6 relative">
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-oki-blue-dark text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
									3
								</div>
								<h3 className="text-xl font-semibold mb-3 text-oki-gray-dark text-center mt-4">
									Interviews
								</h3>
								<p className="text-gray-600 text-center">
									Selected candidates participate in technical and cultural fit
									interviews with the hiring team.
								</p>
							</div>

							<div className="bg-white rounded-lg shadow-md p-6 relative">
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-oki-blue-dark text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
									4
								</div>
								<h3 className="text-xl font-semibold mb-3 text-oki-gray-dark text-center mt-4">
									Offer
								</h3>
								<p className="text-gray-600 text-center">
									Successful candidates receive an offer and begin their journey
									with O.K. Isokariari Nigeria Limited.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section className="py-16 bg-oki-blue-dark text-white">
					<div className="container mx-auto px-4 text-center">
						<h2 className="text-3xl font-bold mb-6">
							Didn't See a Perfect Match?
						</h2>
						<p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
							We're always looking for talented individuals to join our team.
							Submit your resume for future opportunities.
						</p>
						<ApplyDialog label="Send Open Application" job={offer} />
					</div>
				</section>
			</div>
		</WebLayout>
	);
};

export default Careers;
