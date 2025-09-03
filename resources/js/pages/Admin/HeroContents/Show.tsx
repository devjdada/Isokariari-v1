import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import type { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

interface HeroContent {
    id: number;
    title: string;
    subtitle: string | null;
    description: string | null;
    image_path: string;
    button_text: string | null;
    button_link: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export default function HeroContentShow({ auth, heroContent }: PageProps<{ heroContent: HeroContent }>) {
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Hero Content Details</h2>}>
            <Head title={heroContent.title} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <h3 className="mb-4 text-lg font-medium">{heroContent.title}</h3>
                        <p>
                            <strong>Subtitle:</strong> {heroContent.subtitle}
                        </p>
                        {heroContent.image_path && (
                            <div className="mt-4">
                                <img src={`/storage/${heroContent.image_path}`} alt={heroContent.title} className="h-auto max-w-xs rounded-md" />
                            </div>
                        )}
                        {heroContent.button_text && (
                            <p>
                                <strong>Button Text:</strong> {heroContent.button_text}
                            </p>
                        )}
                        {heroContent.button_link && (
                            <p>
                                <strong>Button Link:</strong>{' '}
                                <a href={heroContent.button_link} target="_blank" rel="noopener noreferrer">
                                    {heroContent.button_link}
                                </a>
                            </p>
                        )}
                        <p>
                            <strong>Active:</strong> {heroContent.is_active ? 'Yes' : 'No'}
                        </p>
                        {heroContent.description && (
                            <div className="mt-4">
                                <strong>Description:</strong>
                                <div dangerouslySetInnerHTML={{ __html: heroContent.description }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
