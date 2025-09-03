import { Button } from '@/components/ui/button';
import WebLayout from '@/layouts/WebLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ServicePublicIndex({ services }: { services: any[] }) {
    const [bgImage, setBgImage] = useState<string>('');

    const fallbackImage = '/images/logo.png'; // Use your own fallback image URL

    useEffect(() => {
        let intervalId;

        if (Array.isArray(services) && services.length > 0) {
            const validImages = services.map((h) => h?.image?.trim()).filter((img) => img); // filter out empty or undefined images

            if (validImages.length > 1) {
                // Set an initial image
                setBgImage(validImages[Math.floor(Math.random() * validImages.length)]);

                intervalId = setInterval(() => {
                    const randomImage = validImages[Math.floor(Math.random() * validImages.length)];
                    setBgImage(randomImage);
                }, 3000); // change every 3 seconds
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
    }, [services]);
    return (
        <WebLayout>
            <Head title="Our Services" />

            <div>
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
        .service-hover {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 112, 243, 0.65);
    color: white;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    text-align: center;
    transform: translateY(calc(100% - 60px));
    transition: transform 0.3s ease-in-out;
    height: 100%;
  }
    .service-card{
        height:500px
    }
  .service-card:hover .service-hover {
    transform: translateY(0);
  }
  .service-title {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 1rem;
    transition: all 0.3s ease-in-out;
  }
  .service-card:hover .service-title {
    background-color: transparent;
    position: relative;
  }
  .service-content {
    opacity: 0;
    transition: opacity 0.2s ease-in-out 0.1s;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .service-card:hover .service-content {
    opacity: 1;
  }
        .skeleton {
          position: relative;
          overflow: hidden;
          background-color: #e2e8f0;
          border-radius: 0.5rem;
        }
        .skeleton::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 1.2s infinite;
        }
        @keyframes shimmer {
          100% {
            left: 100%;
          }
        }
      `}</style>
                <section className="team-hero-bg py-20 pt-32 text-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl">
                            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Our Services</h1>
                            <p className="text-xl text-white/90">
                                With over five decades of experience, we provide comprehensive engineering and construction services to meet the
                                diverse needs of our clients.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {services &&
                                services.map((service, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: -50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        key={service.id}
                                        className="service-card relative h-72 overflow-hidden rounded-lg shadow-md"
                                    >
                                        <img
                                            src={service.image || '/placeholder.jpg'}
                                            alt={service.title}
                                            className="h-full w-full rounded-lg object-cover"
                                        />
                                        <div className="service-hover rounded-lg">
                                            <Link
                                                href={`/services/${service.slug}`}
                                                className="flex items-center justify-center gap-2 font-semibold uppercase"
                                            >
                                                <div className="text-lg font-bold">{service.title}</div>
                                            </Link>
                                            <div className="service-content">
                                                <p className="mb-4 line-clamp-5">{service.description}</p>
                                                <Link
                                                    href={`/services/${service.slug}`}
                                                    className="flex items-center justify-center gap-2 font-semibold underline"
                                                >
                                                    Learn More <ArrowRight size={16} />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                        </div>
                    </div>
                </section>

                <section className="bg-oki-gray-light py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="mb-6 text-3xl font-bold text-oki-gray-dark">Need a Customized Solution?</h2>
                        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
                            Our team of experts is ready to work with you to develop tailored solutions for your specific project requirements.
                        </p>
                        <Link to="/contact">
                            <Button className="bg-oki-red px-8 py-6 text-white hover:bg-oki-red/90">Request a Consultation</Button>
                        </Link>
                    </div>
                </section>
            </div>
        </WebLayout>
    );
}
