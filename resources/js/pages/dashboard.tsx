import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Import Card components
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import type { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

interface DashboardProps extends PageProps {
    projectsCount: number;
    blogsCount: number;
    servicesCount: number;
    pagesCount: number;
    jobListingsCount: number;
    clientsCount: number;
    teamsCount: number;
    testimoniesCount: number;
    equipmentCount: number;
    branchesCount: number;
    categoriesCount: number;
    usersCount: number;
    applicationsCount: number;
}

export default function Dashboard({
    auth,
    projectsCount,
    blogsCount,
    servicesCount,
    pagesCount,
    jobListingsCount,
    clientsCount,
    teamsCount,
    testimoniesCount,
    equipmentCount,
    branchesCount,
    categoriesCount,
    usersCount,
    applicationsCount,
}: DashboardProps) {
    const stats = [
        { title: 'Total Projects', value: projectsCount },
        { title: 'Total Blogs', value: blogsCount },
        { title: 'Total Services', value: servicesCount },
        { title: 'Total Pages', value: pagesCount },
        { title: 'Total Job Listings', value: jobListingsCount },
        { title: 'Total Clients', value: clientsCount },
        { title: 'Total Team Members', value: teamsCount },
        { title: 'Total Testimonies', value: testimoniesCount },
        { title: 'Total Equipment', value: equipmentCount },
        { title: 'Total Branches', value: branchesCount },
        { title: 'Total Categories', value: categoriesCount },
        { title: 'Total Users', value: usersCount },
        { title: 'Total Applications', value: applicationsCount },
    ];

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Admin Dashboard</h2>}>
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {stats.map((stat, index) => (
                            <Card key={index}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                    {/* You can add an icon here if desired */}
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
