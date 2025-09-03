import { Link } from "@inertiajs/react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import type { EquipmentsProps } from "@/types/EquipmentsProps";
import { Button } from "../ui/button";

const EquipmentSection = ({
	equipments,
}: {
	equipments: EquipmentsProps[];
}) => {
	const plugin = useRef(Autoplay({ delay: 2300, stopOnInteraction: false }));

	return (
		<section className="bg-oki-gray-light py-16">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mb-3 text-center"
				>
					<h2 className="mb-4 text-3xl font-bold text-oki-gray-dark">
						OUR EQUIPMENT
					</h2>
					<p className="mx-auto max-w-3xl text-gray-600">
						At O.K. Isokariari Nigeria Limited (O.K.I), we pride ourselves on
						maintaining a modern, diverse, and reliable fleet of equipment to
						handle a wide range of construction, earthmoving, and transportation
						projects. Our machines are operated by skilled professionals and
						maintained to the highest standards to ensure performance, safety,
						and efficiency on every job.
					</p>
				</motion.div>

				<Carousel
					opts={{ align: "start", loop: true }}
					plugins={[plugin.current]}
					className="w-full px-4 sm:px-6 md:px-8"
				>
					<CarouselContent className="-ml-4">
						{equipments.map((eq) => (
							<CarouselItem
								key={`ClientCarousel-${eq.id}`}
								className="pl-4 md:basis-1/3 lg:basis-1/4"
							>
								<motion.div
									initial={{ opacity: 0, x: 150 }}
									viewport={{ once: false }}
									whileInView={{ opacity: 1, x: 0 }}
									className="relative flex cursor-pointer items-center justify-center transition-shadow duration-500 hover:shadow-md"
								>
									<img
										src={eq.image}
										alt={`${eq.name} - O.K. Isokariari Nigeria Limited Equipment`}
										className="h-80 w-full rounded-lg shadow-xl"
									/>
									<div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
										<p className="text-sm font-semibold">{eq.name}</p>
									</div>
								</motion.div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>

			<div className="mt-6 text-center">
				<Link href="/equipment">
					<Button className="bg-oki-blue-dark px-8 text-white hover:bg-oki-blue-light">
						Explore All Equipment
					</Button>
				</Link>
			</div>
		</section>
	);
};

export default EquipmentSection;
