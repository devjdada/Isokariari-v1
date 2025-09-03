import GuestLayout from '@/layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface HeroContent {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    link: string;
}

export default function HeroContentPublicIndex({ heroContents }: PageProps<{ heroContents: HeroContent[] }>) {
    return (
        <GuestLayout>
            <Head title="Hero Contents" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="mb-4 text-lg font-medium">Hero Contents</h3>
                            {heroContents.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {heroContents.map((heroContent) => (
                                        <div key={heroContent.id} className="rounded-md border p-4">
                                            {heroContent.image && (
                                                <img
                                                    src={heroContent.image}
                                                    alt={heroContent.title}
                                                    className="mb-4 h-48 w-full rounded-md object-cover"
                                                />
                                            )}
                                            <h4 className="text-lg font-semibold">{heroContent.title}</h4>
                                            <p className="text-gray-600">{heroContent.subtitle}</p>
                                            <Link href={heroContent.link} className="mt-2 block text-blue-600 hover:underline">
                                                {heroContent.link ? 'View More' : ''}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No hero contents found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
