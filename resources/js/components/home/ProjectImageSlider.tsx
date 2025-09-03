import axios from '@/api/axios';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface GalleryItem {
    id: number;
    image: string;
    gallery: string;
    title: string;
}

const SkeletonCard = () => <div className="h-24 w-full animate-pulse rounded-md bg-gray-200" />;

const ProjectImageSlider = () => {
    const plugin = useRef(Autoplay({ delay: 6300, stopOnInteraction: false }));
    const [galleries, setGalleries] = useState<GalleryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchGalleries = async () => {
        try {
            const response = await axios.get('/api/gallery-images/history');
            const { data } = response;
            setGalleries(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error fetching galleries:', error.message);
            } else {
                console.error('An unknown error occurred while fetching galleries');
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchGalleries();
    }, [fetchGalleries]);

    return (
        <section className="bg-oki-gray-light">
            <div className="container mx-auto px-4">
                {isLoading ? (
                    <div className="">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                ) : (
                    <Carousel opts={{ align: 'start', loop: true }} plugins={[plugin.current]} className="w-full">
                        <CarouselContent className="-ml-4">
                            {galleries.map((eq) => (
                                <CarouselItem key={`ClientCarousel-${eq.id}`} className=" ">
                                    <motion.div
                                        initial={{ opacity: 0, x: 150 }}
                                        viewport={{ once: false }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        className="relative flex cursor-pointer items-center justify-center transition-shadow duration-500 hover:shadow-md"
                                    >
                                        <img src={eq.image} alt={`${eq.gallery} logo`} className="h-80 w-full rounded-lg shadow-xl" />

                                        {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-6">
                      <Link to={"/projects"}>
                        {" "}
                        <p className="text-sm font-semibold">{eq.title}</p>
                      </Link>{" "}
                    </div> */}
                                    </motion.div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                )}
            </div>
        </section>
    );
};

export default ProjectImageSlider;
