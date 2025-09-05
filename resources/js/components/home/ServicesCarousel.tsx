import { Link } from "@inertiajs/react";
import Autoplay from "embla-carousel-autoplay";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

interface Service {
	id: number;
	title: string;
	description: string;
	image: string;
	slug: string;
}

const ServicesCarousel = ({ services }: { services: Service[] }) => {
	const plugin = useRef(Autoplay({ delay: 2300, stopOnInteraction: false }));

	return (
		<section className="relative py-16 bg-oki-gray-light">
			<div className="container px-4 mx-auto">
				<div className="mb-12 text-center">
					<h2 className="mb-4 text-3xl font-bold text-oki-gray-dark md:text-4xl">
						Our Services
					</h2>
					<p className="max-w-2xl mx-auto text-gray-600">
						With over five decades of experience, we provide comprehensive
						engineering and construction services to meet the diverse needs of
						our clients.
					</p>
				</div>

				<div className="relative overflow-hidden">
					<Carousel
						opts={{ align: "start", loop: true }}
						plugins={[plugin.current]}
						className="w-full"
					>
						<CarouselContent className="gap-3 px-4 sm:px-6 md:px-8">
							{services?.map((service, index) => (
								<CarouselItem
									key={`ServiceCarousel-${service.id}`}
									className="pl-4 md:basis-1/2 lg:basis-1/3"
								>
									<motion.div
										key={`service-${service.id}-${index}`}
										initial={{ opacity: 30, x: 150 }}
										viewport={{ once: false }}
										whileInView={{ opacity: 1, x: 0 }}
										className="relative flex h-72 min-w-[350px] flex-col overflow-hidden rounded-lg bg-white/50 p-2 shadow-md transition-shadow hover:shadow-lg lg:min-w-[400px]"
										style={{
											backgroundImage: `url(${service.image})`,
											backgroundSize: "cover",
											backgroundPosition: "center",
										}}
									>
										<div className="flex flex-col h-full p-4 bg-white/55 rounded-4xl bg-opacity-70">
											<h3 className="mb-2 text-lg font-semibold text-oki-blue-dark">
												{service.title}
											</h3>
											<p className="flex-grow text-sm text-black line-clamp-4">
												{service.description}
											</p>
											<Link href={`/services/${service.slug}`} className="mt-2">
												<Button
													variant="outline"
													className="w-full text-white border-oki-blue-dark hover:bg-oki-blue-dark hover:text-white"
												>
													Learn More
												</Button>
											</Link>
										</div>
									</motion.div>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</div>

				<div className="mt-10 text-center">
					<Link href="/services">
						<Button className="px-8 text-white bg-oki-blue-dark hover:bg-oki-blue-light">
							View All Services
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default ServicesCarousel;
