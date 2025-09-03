import GuestLayout from '@/layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

interface Equipment {
    id: number;
    name: string;
    image: string;
    description: string;
}

export default function EquipmentPublicShow({ equipment }: PageProps<{ equipment: Equipment }>) {
    return (
        <GuestLayout>
            <Head title={equipment.name} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="mb-4 text-lg font-medium">{equipment.name}</h3>
                            {equipment.image && (
                                <img src={equipment.image} alt={equipment.name} className="mb-4 h-64 w-full rounded-md object-cover" />
                            )}
                            <div dangerouslySetInnerHTML={{ __html: equipment.description }} />
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
