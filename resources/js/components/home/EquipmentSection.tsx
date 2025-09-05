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
		<section className="py-16 bg-oki-gray-light">
			<div className="container px-4 mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mb-3 text-center"
				>
					<h2 className="mb-4 text-3xl font-bold text-oki-gray-dark">
						OUR EQUIPMENT
					</h2>
					<p className="max-w-3xl mx-auto text-gray-600">
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
									className="relative flex items-center justify-center transition-shadow duration-500 cursor-pointer hover:shadow-md"
								>
									<img
										src={eq.image}
										alt={`${eq.name} - O.K. Isokariari Nigeria Limited Equipment`}
										className="w-full rounded-lg shadow-xl h-80"
									/>
									<div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/70 to-transparent">
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
					<Button className="px-8 text-white bg-oki-blue-dark hover:bg-oki-blue-light">
						Explore All Equipment
					</Button>
				</Link>
			</div>
		</section>
	);
};

export default EquipmentSection;
