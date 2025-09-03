import StatsSection from '@/components/home/StatsSection';
import { Button } from '@/components/ui/button';
import WebLayout from '@/layouts/WebLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface ServiceData {
    id: string;
    slug: string;
    title: string;
    description: string;
    icon: string;
    fullDescription: string[];
    benefits: string[];
    image: string;
}

interface ServiceShowProps {
    service: ServiceData;
    relatedServices: ServiceData[];
}

const ServiceDetail = ({ service, relatedServices }: ServiceShowProps) => {
    return (
        <WebLayout>
            <Head title={service.title} />
            <>
                <section
                    className="bg-gradient-blue py-20 text-white"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(0, 70, 173, 0.85), rgba(0, 160, 233, 0.85)), url(${service.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="container mx-auto px-4 pt-20">
                        <div className="max-w-3xl">
                            <Link href="/services" className="mb-4 inline-flex items-center text-white/90 hover:text-white">
                                <ArrowLeft size={16} className="mr-2" />
                                <span>Back to Services</span>
                            </Link>
                            <h1 className="mb-6 text-4xl font-bold md:text-5xl">{service.title}</h1>
                            <p className="text-xl text-white/90"></p>
                        </div>
                    </div>
                </section>

                {/* Service Description */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                <img src={service.image} alt={service.title} className="pb-4" />
                                <h2 className="mb-6 text-3xl font-bold text-oki-gray-dark">Overview</h2>
                                {service.description ? (
                                    <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: service.description }} />
                                ) : (
                                    <p className="text-gray-500">No documentation provided.</p>
                                )}

                                <StatsSection />
                            </div>

                            <div className="lg:col-span-1">
                                <div className="sticky top-24 rounded-lg bg-oki-gray-light p-6">
                                    <h3 className="mb-6 text-xl font-semibold text-oki-gray-dark">Request This Service</h3>
                                    <p className="mb-6 text-gray-600">
                                        Interested in our {service.title.toLowerCase()} services? Contact us for a consultation and quote.
                                    </p>
                                    <Link href="/contact">
                                        <Button className="mb-4 w-full bg-oki-red text-white hover:bg-oki-red/90">Contact Us</Button>
                                    </Link>
                                    <Link href="/projects">
                                        <Button
                                            variant="outline"
                                            className="w-full border-oki-blue-dark text-oki-blue-dark hover:bg-oki-blue-dark hover:text-white"
                                        >
                                            View Related Projects
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Services */}
                <section className="bg-oki-gray-light py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-10 text-center text-3xl font-bold text-oki-gray-dark">Other Services You Might Need</h2>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {relatedServices &&
                                relatedServices.map((relatedService) => (
                                    <div key={relatedService.id} className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
                                        <div className="mb-4 text-4xl">{relatedService.icon}</div>
                                        <h3 className="mb-3 text-xl font-semibold text-oki-gray-dark">{relatedService.title}</h3>
                                        <p className="mb-4 line-clamp-6 text-gray-600">{relatedService.description}</p>
                                        <Link
                                            href={`/services/${relatedService.slug}`}
                                            className="flex items-center font-medium text-oki-blue-dark transition-colors hover:text-oki-blue-light"
                                        >
                                            <span>Learn More</span>
                                            <ArrowLeft size={16} className="ml-2 rotate-180" />
                                        </Link>
                                    </div>
                                ))}
                        </div>
                    </div>
                </section>
            </>
        </WebLayout>
    );
};

export default ServiceDetail;
