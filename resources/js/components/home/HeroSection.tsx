import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section className="bg-hero-pattern relative flex min-h-screen items-center bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-r from-oki-blue-dark/80 to-oki-blue-light/80"></div>
            <div className="relative z-10 container mx-auto mt-16 px-4 py-20">
                <div className="max-w-3xl">
                    <h1 className="mb-4 text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl">50 Years of Engineering Excellence</h1>
                    <p className="mb-8 text-xl text-white/90 md:text-2xl">
                        O.K. Isokariari Nigeria Limited (O.K.I) is a leading EPC company specializing in civil engineering and building projects for a
                        diverse range of clients since 1972.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Link to="/about">
                            <Button className="bg-white px-8 py-6 text-base font-semibold text-oki-blue-dark hover:bg-white/90">Learn More</Button>
                        </Link>
                        <Link to="/contact">
                            <Button className="bg-oki-red px-8 py-6 text-base font-semibold text-white hover:bg-oki-red/90">Contact Us</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
