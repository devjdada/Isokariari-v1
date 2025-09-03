import { Link } from "@inertiajs/react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { ClientsProps } from "@/types/ClientsProps";
import { Button } from "../ui/button";

// Skeleton loader component
const SkeletonCard = () => (
	<div className="h-24 w-full animate-pulse rounded-md bg-gray-200" />
);

const ClientsCarousel = ({ clients }: { clients: ClientsProps[] }) => {
	const plugin = useRef(Autoplay({ delay: 1000, stopOnInteraction: false }));

	const [selectedClient, setSelectedClient] = useState<ClientsProps | null>(
		null,
	);
	const [open, setOpen] = useState(false);

	return (
		<section className="bg-white py-12">
			<div className="container mx-auto px-4">
				<div className="mb-12 text-center">
					<h2 className="mb-4 text-3xl font-bold text-oki-gray-dark md:text-4xl">
						Our Trusted Clients
					</h2>
					<p className="mx-auto max-w-2xl text-gray-600">
						We are proud to have worked with some of the most reputable
						companies in the oil and gas, construction, and infrastructure
						sectors.
					</p>
				</div>

				<Carousel
					opts={{ align: "start", loop: true }}
					plugins={[plugin.current]}
					className="w-full px-4 sm:px-6 md:px-8"
				>
					<CarouselContent className="-ml-4">
						{clients?.map((client) => (
							<CarouselItem
								key={`ClientCarousel-${client.id}`}
								className="pl-4 md:basis-1/4 lg:basis-1/6"
							>
								<motion.div
									initial={{ opacity: 0, y: -100 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: false }}
									className="flex cursor-pointer items-center justify-center transition-shadow duration-300 hover:shadow-md"
								>
									<div className="w-80 h-80 overflow-hidden flex items-center gap-8 justify-center">
										<img
											src={client.image}
											alt={`${client.name} logo`}
											className="w-80 h-80 object-contain"
										/>
									</div>
								</motion.div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>

			<div className="mt-1 text-center">
				<Link href="/clients">
					<Button className="bg-oki-blue-dark px-8 text-white hover:bg-oki-blue-light">
						Explore All Clients
					</Button>
				</Link>
			</div>

			{/* Client Detail Dialog */}
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-md">
					{selectedClient && (
						<>
							<DialogHeader>
								<DialogTitle className="text-xl font-semibold">
									{selectedClient.name}
								</DialogTitle>
							</DialogHeader>
							<div className="flex items-center justify-center py-4">
								<img
									src={selectedClient.image}
									alt={`${selectedClient.name} logo`}
									className="h-24 w-24 object-contain"
								/>
							</div>
							<DialogDescription className="text-center">
								{selectedClient.content}
							</DialogDescription>
						</>
					)}
				</DialogContent>
			</Dialog>
		</section>
	);
};

export default ClientsCarousel;
