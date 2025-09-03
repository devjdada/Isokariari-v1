import axios from '@/api/axios';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/plugins/captions.css';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';

interface GalleryItem {
    id: number;
    image: string;
    title: string;
    description: string;
}

const Gallery = () => {
    const [galleries, setGalleries] = useState<GalleryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const fetchGalleries = async () => {
        try {
            const response = await axios.get('/api/all-gallery-images');
            const { data } = response;
            setGalleries(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast({
                    title: 'Error',
                    description: error.message || 'Failed to fetch galleries',
                    variant: 'destructive',
                });
            } else {
                toast({
                    title: 'Error',
                    description: 'An unknown error occurred',
                    variant: 'destructive',
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchGalleries();
    }, [fetchGalleries]);

    // Get 15 random images from the galleries array
    const getRandomImages = () => {
        if (galleries.length <= 15) return galleries;

        // Shuffle array and take first 15
        const shuffled = [...galleries].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 15);
    };

    const randomImages = getRandomImages();

    return (
        <section className="bg-oki-gray-dark text-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-4 gap-1 sm:grid-cols-8">
                    {/* Display 15 random images */}
                    {randomImages.map((galleryItem, index) => (
                        <div key={galleryItem.id} className="relative aspect-square">
                            <img
                                onClick={() => setLightboxIndex(index)}
                                src={galleryItem.image}
                                alt={`${galleryItem.title} - O.K. Isokariari Nigeria Limited Gallery`}
                                className="h-full w-full rounded-md object-cover"
                            />
                        </div>
                    ))}

                    {/* 16th item as a button */}
                    <div className="relative aspect-square">
                        <Link to="/gallery" className="h-full w-full">
                            <Button className="bg-oki-blue h-full w-full rounded-md text-sm text-white hover:bg-oki-blue-dark sm:text-base">
                                View All
                            </Button>
                        </Link>
                    </div>
                    {lightboxIndex !== null && (
                        <Lightbox
                            open
                            index={lightboxIndex}
                            close={() => setLightboxIndex(null)}
                            slides={randomImages.map((img) => ({
                                src: img.image,
                                title: img.title,
                                description: img.description,
                            }))}
                            plugins={[Thumbnails, Captions]}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
