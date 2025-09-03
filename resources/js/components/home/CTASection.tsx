import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

const CTASection = () => {
    return (
        <section className="bg-oki-gray-dark py-16 text-white">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Start Your Next Project?</h2>
                    <p className="mb-8 text-lg text-white/80">
                        Let's work together to bring your vision to life with our 50 years of engineering excellence.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link href="/contact">
                            <Button className="bg-oki-red px-8 py-6 text-lg text-white hover:bg-oki-red/90">Contact Us</Button>
                        </Link>
                        <Link href="/projects">
                            <Button
                                variant="outline"
                                className="border-white px-8 py-6 text-lg text-blue-900 hover:bg-white hover:text-oki-gray-dark"
                            >
                                View Our Projects
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
