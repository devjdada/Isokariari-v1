import { Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import type { HeroItem } from '@/types/HeroProps';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const HeroCarousel = ({ hero }: { hero: HeroItem[] }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        if (hero && hero.length > 1) {
            setCurrentSlide((prev) => (prev === hero.length - 1 ? 0 : prev + 1));
        }
    };

    const prevSlide = () => {
        if (hero && hero.length > 1) {
            setCurrentSlide((prev) => (prev === 0 ? hero.length - 1 : prev - 1));
        }
    };

    useEffect(() => {
        if (hero && hero.length > 1) {
            const interval = setInterval(nextSlide, 8000);
            return () => clearInterval(interval);
        }
    }, [hero, currentSlide, nextSlide]);

    if (!hero || hero.length === 0) {
        return (
            <section className="relative flex min-h-screen items-center justify-center">
                <p>No hero content available.</p>
            </section>
        );
    }

    const current = hero[currentSlide];

    return (
        <section className="relative min-h-screen overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0.9 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="relative flex min-h-screen items-center"
                >
                    <motion.div
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        key={current?.id}
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.4 }}
                        transition={{ duration: 20, ease: 'easeOut' }}
                        style={{
                            backgroundImage: `url(${current?.image_path})`,
                        }}
                    />

                    <div className="absolute inset-0 z-10 bg-gradient-to-r from-oki-blue-dark/80 to-oki-blue-light/80" />

                    <div className="relative z-20 container mx-auto mt-16 px-4 py-20">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="max-w-3xl"
                        >
                            <motion.h1
                                className="mb-4 text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                {current?.title}
                            </motion.h1>
                            <motion.p
                                className="mb-8 text-xl text-white/90 md:text-2xl"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                {current?.subtitle}
                            </motion.p>
                            <motion.div
                                className="flex flex-col gap-4 sm:flex-row"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <Link href="/about">
                                    <Button className="bg-white px-8 py-6 text-base font-semibold text-oki-blue-dark hover:bg-white/90">
                                        Learn More
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button className="bg-oki-red px-8 py-6 text-base font-semibold text-white hover:bg-oki-red/90">
                                        Contact Us
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>

                    {hero.length > 1 && (
                        <div className="absolute right-0 bottom-10 left-0 z-30 flex justify-center gap-4">
                            {hero.map((_, index) => (
                                <Button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-3 w-3 rounded-full ${
                                        index === currentSlide ? 'bg-white' : 'bg-white/50'
                                    } transition-all duration-300`}
                                />
                            ))}
                        </div>
                    )}

                    {hero.length > 1 && (
                        <>
                            <Button
                                onClick={prevSlide}
                                className="absolute top-1/2 left-4 z-30 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
                            >
                                <ChevronLeft size={24} />
                            </Button>
                            <Button
                                onClick={nextSlide}
                                className="absolute top-1/2 right-4 z-30 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
                            >
                                <ChevronRight size={24} />
                            </Button>
                        </>
                    )}
                </motion.div>
            </AnimatePresence>
        </section>
    );
};

export default HeroCarousel;
