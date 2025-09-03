import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface Service {
    id: number;
    title: string;
    description: string;
    image: string;
    slug: string;
}
const cardWidth = 360;
const gap = 24;

const ServicesCarousel = ({ services }: { services: Service[] }) => {
    const duplicatedServices = Array.isArray(services) ? [...services, ...services] : [];

    return (
        <section className="relative bg-oki-gray-light py-16">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-oki-gray-dark md:text-4xl">Our Services</h2>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        With over five decades of experience, we provide comprehensive engineering and construction services to meet the diverse needs
                        of our clients.
                    </p>
                </div>

                <div className="relative overflow-hidden">
                    <motion.div
                        className="flex gap-6"
                        animate={{ x: `-${1 * (cardWidth + gap)}px` }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        style={{
                            width: `${duplicatedServices.length * (cardWidth + gap)}px`,
                        }}
                    >
                        {duplicatedServices &&
                            duplicatedServices.map((service, index) => (
                                <div
                                    key={`service-${service.id}-${index}`}
                                    className="relative flex h-72 min-w-[350px] flex-col overflow-hidden rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg lg:min-w-[400px]"
                                    style={{
                                        backgroundImage: `url(${service.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    <div className="bg-opacity-70 flex h-full flex-col rounded bg-white p-4">
                                        {/* <div className="text-4xl mb-2">{service.icon}</div> */}
                                        <h3 className="mb-2 text-lg font-semibold text-oki-gray-dark">{service.title}</h3>
                                        <p className="line-clamp-4 flex-grow text-sm text-gray-600">{service.description}</p>
                                        <Link href={`/services/${service.slug}`} className="mt-2">
                                            <Button
                                                variant="outline"
                                                className="w-full border-oki-blue-dark text-oki-blue-dark hover:bg-oki-blue-dark hover:text-white"
                                            >
                                                Learn More
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </motion.div>
                </div>

                <div className="mt-10 text-center">
                    <Link href="/services">
                        <Button className="bg-oki-blue-dark px-8 text-white hover:bg-oki-blue-light">View All Services</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ServicesCarousel;
