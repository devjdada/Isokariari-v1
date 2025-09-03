import GuestLayout from '@/layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

interface HeroContent {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    link: string;
}

export default function HeroContentPublicShow({ heroContent }: PageProps<{ heroContent: HeroContent }>) {
    return (
        <GuestLayout>
            <Head title={heroContent.title} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="mb-4 text-lg font-medium">{heroContent.title}</h3>
                            <p className="mb-4 text-gray-600">{heroContent.subtitle}</p>
                            {heroContent.image && (
                                <img src={heroContent.image} alt={heroContent.title} className="mb-4 h-64 w-full rounded-md object-cover" />
                            )}
                            {heroContent.link && (
                                <a href={heroContent.link} className="mt-2 block text-blue-600 hover:underline">
                                    View More
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
