import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

export default function CompanyInfoCreate({ auth }: PageProps) {
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Create Company Info</h2>}>
            <Head title="Create Company Info" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Create Company Info Form</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
