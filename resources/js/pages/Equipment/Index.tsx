import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ClientsCarousel from "@/components/home/ClientsCarousel";
import { Button } from "@/components/ui/button";
import WebLayout from "@/layouts/WebLayout";
import type { ClientProps } from "@/types/ClientProps";

interface EquipmentProps {
	id: number;
	name: string;
	image: string;
	content: string; // Changed from description to content to match provided code
}

interface EquipmentIndexProps {
	equipments: EquipmentProps[];
	clients: ClientProps[];
}

const Equipment = ({ equipments, clients }: EquipmentIndexProps) => {
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

	const [bgImage, setBgImage] = useState<string>("");

	const fallbackImage =
		"/lovable-uploads/913966a1-aabe-49b4-a605-333251687c87.png"; // Use your own fallback image URL

	useEffect(() => {
		if (Array.isArray(equipments) && equipments.length > 0) {
			const randomPost =
				equipments[Math.floor(Math.random() * equipments.length)];
			const image = randomPost?.image?.trim() || "";
			setBgImage(image !== "" ? image : fallbackImage);
		} else {
			setBgImage(fallbackImage);
		}
	}, [equipments]);

	return (
		<WebLayout>
			<Head title="Equipments" />

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
							<h1 className="text-4xl md:text-5xl font-bold mb-6">
								Our Equipments
							</h1>
							<p className="text-xl text-white/90 leading-relaxed mb-4">
								At O.K. Isokariari Nigeria Limited (O.K.I), we pride ourselves
								on maintaining a modern, diverse, and reliable fleet of
								equipment to handle a wide range of construction, earthmoving,
								and transportation projects. Our machines are operated by
								skilled professionals and maintained to the highest standards to
								ensure performance, safety, and efficiency on every job.
							</p>
						</motion.div>
					</div>
				</section>

				{/* Meet Our Top Management Section */}
				<section className="py-16 bg-oki-gray-light">
					<div className="container mx-auto px-4">
						<div className="text-center mb-12"></div>

						<div className="grid grid-cols-1 md:grid-cols-1  gap-8">
							{equipments.length > 0 ? (
								equipments.map((member, index) => {
									const isImageLeft = index % 2 === 0;
									return (
										<motion.div
											key={member.id}
											variants={fadeIn}
											viewport={{ once: false }}
											className="bg-white grid grid-cols-1 md:grid-cols-2 items-center rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
										>
											{isImageLeft && (
												<motion.div
													initial={{ opacity: 0, x: 230 }}
													whileInView={{ opacity: 1, x: 0 }}
													viewport={{ once: false }}
													className="h-86 overflow-hidden"
												>
													<img
														src={member.image}
														alt={member.name}
														className="w-full h-full object-cover object-center"
													/>
												</motion.div>
											)}
											<div className="p-6">
												<h3 className="text-xl font-bold text-oki-gray-dark">
													{member.name}
												</h3>

												<div
													className="text-gray-600"
													dangerouslySetInnerHTML={{ __html: member.content }}
												/>
											</div>
											{!isImageLeft && (
												<motion.div
													initial={{ opacity: 0, x: -230 }}
													whileInView={{ opacity: 1, x: 0 }}
													viewport={{ once: false, amount: 0.4 }}
													className="h-86 overflow-hidden"
												>
													<img
														src={member.image}
														alt={member.name}
														className="w-full h-full object-cover object-center"
													/>
												</motion.div>
											)}
										</motion.div>
									);
								})
							) : (
								<div>No equipments found.</div>
							)}
						</div>
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
										className="border-white text-white hover:bg-white/10 px-8 py-6"
									>
										Meet Our Equipment
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

export default Equipment;
