import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { HeroItem } from '@/types/HeroProps';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { AwardIcon, BriefcaseBusiness, Building2, CheckCircle2, Clock, Handshake, HardHatIcon, ShieldCheck, TractorIcon, Users } from 'lucide-react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface StatProps {
    value: number;
    label: string;
    suffix?: string;
    duration?: number;
    icon?: React.ReactNode;
}

const gridVariantsLeft = {
    hidden: { x: '-100vw', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 60 } },
};

const gridVariantsRight = {
    hidden: { x: '100vw', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 60 } },
};

const StatCounter = ({ value, label, suffix = '', duration = 2000, icon }: StatProps) => {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const countingCompleted = useRef(false);

    useEffect(() => {
        if (!inView || countingCompleted.current) return;

        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * value));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                countingCompleted.current = true;
            }
        };

        window.requestAnimationFrame(step);
    }, [inView, value, duration]);

    return (
        <div ref={ref} className="flex items-center gap-4 p-2">
            {icon}
            <div>
                <div className="mb-2 text-4xl font-bold text-white md:text-5xl">
                    {count}
                    {suffix}
                </div>
                <div className="text-lg tracking-wider text-white uppercase">{label}</div>
            </div>
        </div>
    );
};

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
    return (
        <Card className="border-none shadow-lg transition-all duration-300 hover:shadow-xl">
            <CardContent className="flex flex-col items-start p-6">
                <div className="mb-4 rounded-full bg-oki-blue-light/10 p-3 text-oki-blue-dark">{icon}</div>
                <h3 className="mb-2 text-xl font-bold text-gray-800">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </CardContent>
        </Card>
    );
};
const fallbackImage = '/images/logo.png';

const StatsSection = ({ hero }: { hero: HeroItem[] }) => {
    const stats = [
        {
            icon: <AwardIcon size={52} color="white" />,
            value: 50,
            label: 'Years of Excellence',
            suffix: '+',
        },
        {
            icon: <BriefcaseBusiness size={52} color="white" />,
            value: 200,
            label: 'Trusted Clients',
            suffix: '+',
        },
        {
            icon: <HardHatIcon size={52} color="white" />,
            value: 100,
            label: 'Certified Engineers',
            suffix: '+',
        },
        {
            icon: <Building2 size={52} color="white" />,
            value: 1000,
            label: 'Successful Projects',
            suffix: '+',
        },
        {
            icon: <TractorIcon size={52} color="white" />,
            value: 600,
            label: 'Advanced Equipment',
            suffix: '+',
        },
    ];

    const features = [
        {
            icon: <CheckCircle2 size={24} />,
            title: 'Quality Assurance',
            description: 'We uphold the highest industry standards with rigorous quality control on every project.',
        },
        {
            icon: <Clock size={24} />,
            title: 'Timely Delivery',
            description: 'Our efficient project management ensures on-time completion without compromising on quality.',
        },
        {
            icon: <ShieldCheck size={24} />,
            title: 'Safety First',
            description: 'We maintain strict safety protocols that exceed industry requirements on all job sites.',
        },
        {
            icon: <Handshake size={24} />,
            title: 'Client Partnership',
            description: 'We build lasting relationships through transparent communication and collaborative approach.',
        },
        {
            icon: <Users size={24} />,
            title: 'Expert Team',
            description: 'Our highly skilled professionals bring decades of combined experience to every project.',
        },
    ];

    const [bgImage, setBgImage] = useState(fallbackImage);

    useEffect(() => {
        let intervalId;

        if (Array.isArray(hero) && hero.length > 0) {
            const validImages = hero.map((h) => h?.image_path?.trim()).filter((img) => img); // filter out empty or undefined images

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
    }, [hero]);

    return (
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
      `}</style>
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="grid gap-8 md:grid-cols-2">
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: -100,
                            }}
                            whileInView={{
                                x: 0,
                                opacity: 1,
                                transition: {
                                    duration: 0.5,
                                },
                            }}
                            viewport={{
                                once: false,
                                amount: 0.1,
                            }}
                            className="team-hero-bg grid grid-flow-row gap-2 rounded-lg px-8 py-12 md:px-12 lg:px-16"
                        >
                            {stats.map((stat, index) => (
                                <StatCounter icon={stat.icon} key={index} value={stat.value} label={stat.label} suffix={stat.suffix} />
                            ))}
                        </motion.div>
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 100,
                            }}
                            whileInView={{
                                x: 0,
                                opacity: 1,
                                transition: {
                                    duration: 0.5,
                                },
                            }}
                            viewport={{
                                once: false,
                                amount: 0.1,
                            }}
                            className="flex flex-col justify-center"
                        >
                            <div className="mb-8">
                                <Badge variant="outline" className="mb-2 border-oki-blue-dark px-3 py-1 text-oki-blue-dark">
                                    Why Choose Us
                                </Badge>
                                <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">Excellence in Construction for Over 5 Decades</h2>
                                <p className="mb-6 text-gray-600">
                                    Since 1972, we've been delivering exceptional construction services with unwavering commitment to quality, safety,
                                    and client satisfaction. Our proven track record speaks for itself.
                                </p>
                                <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {features.map((feature, index) => (
                                        <div key={index} className="mb-4 flex items-start gap-3">
                                            <div className="mt-1 text-oki-blue-dark">{feature.icon}</div>
                                            <div>
                                                <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                                                <p className="text-sm text-gray-600">{feature.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link
                                    href={'/about'}
                                    className="mt-6 rounded-md bg-oki-blue-dark px-8 py-4 font-semibold text-white transition-colors hover:border-4 hover:bg-white/90 hover:text-oki-blue-dark"
                                >
                                    Learn More About Us
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StatsSection;
