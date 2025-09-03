import Tiptap from '@/components/editor/tiptap';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';

interface CompanyInfo {
    id: number;
    about_content: string | null;
    vision: string | null;
    mission: string | null;
    history: string | null;
    contact_email: string | null;
    contact_phone: string | null;
    address: string | null;
    social_media: { [key: string]: string } | null;
    meta_description: string | null;
    meta_keywords: string | null;
    created_at: string;
    updated_at: string;
}

interface CompanyInfoFormData {
    about_content: string;
    vision: string;
    mission: string;
    history: string;
    contact_email: string;
    contact_phone: string;
    address: string;
    social_media: { [key: string]: string };
    meta_description: string;
    meta_keywords: string;
}

export default function ManageCompanyInfo({ auth, companyInfo }: PageProps<{ companyInfo: CompanyInfo }>) {
    const { data, setData, processing, errors } = useForm<CompanyInfoFormData>({
        about_content: companyInfo.about_content || '',
        vision: companyInfo.vision || '',
        mission: companyInfo.mission || '',
        history: companyInfo.history || '',
        contact_email: companyInfo.contact_email || '',
        contact_phone: companyInfo.contact_phone || '',
        address: companyInfo.address || '',
        social_media: companyInfo.social_media || {},
        meta_description: companyInfo.meta_description || '',
        meta_keywords: companyInfo.meta_keywords || '',
    });

    const handleSocialMediaChange = (platform: string, value: string) => {
        setData('social_media', { ...data.social_media, [platform]: value });
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        router.put(route('admin.company-info.update'), data, {
            onSuccess: () => {
                // No redirection needed, stay on the same page
            },
            onError: (errors) => {
                console.error('Form submission errors:', errors);
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Manage Company Info</h2>}>
            <Head title="Manage Company Info" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <Label htmlFor="about_content">About Content</Label>
                                <Tiptap description={data.about_content} onChange={(newContent) => setData('about_content', newContent)} />
                                <InputError message={errors.about_content} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="vision">Vision</Label>
                                <Tiptap description={data.vision} onChange={(newContent) => setData('vision', newContent)} />
                                <InputError message={errors.vision} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="mission">Mission</Label>
                                <Tiptap description={data.mission} onChange={(newContent) => setData('mission', newContent)} />
                                <InputError message={errors.mission} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="history">History</Label>
                                <Tiptap description={data.history} onChange={(newContent) => setData('history', newContent)} />
                                <InputError message={errors.history} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="contact_email">Contact Email</Label>
                                <Input
                                    id="contact_email"
                                    type="email"
                                    name="contact_email"
                                    value={data.contact_email}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('contact_email', e.target.value)}
                                />
                                <InputError message={errors.contact_email} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="contact_phone">Contact Phone</Label>
                                <Input
                                    id="contact_phone"
                                    type="text"
                                    name="contact_phone"
                                    value={data.contact_phone}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('contact_phone', e.target.value)}
                                />
                                <InputError message={errors.contact_phone} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="address">Address</Label>
                                <Tiptap description={data.address} onChange={(newContent) => setData('address', newContent)} />
                                <InputError message={errors.address} className="mt-2" />
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-lg font-medium">Social Media Links</h4>
                                <div>
                                    <Label htmlFor="social_media.facebook">Facebook URL</Label>
                                    <Input
                                        id="social_media.facebook"
                                        type="url"
                                        name="social_media.facebook"
                                        value={data.social_media.facebook || ''}
                                        className="mt-1 block w-full"
                                        onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                                    />
                                    <InputError message={errors['social_media.facebook']} className="mt-2" />
                                </div>
                                <div>
                                    <Label htmlFor="social_media.twitter">Twitter URL</Label>
                                    <Input
                                        id="social_media.twitter"
                                        type="url"
                                        name="social_media.twitter"
                                        value={data.social_media.twitter || ''}
                                        className="mt-1 block w-full"
                                        onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                                    />
                                    <InputError message={errors['social_media.twitter']} className="mt-2" />
                                </div>
                                <div>
                                    <Label htmlFor="social_media.linkedin">LinkedIn URL</Label>
                                    <Input
                                        id="social_media.linkedin"
                                        type="url"
                                        name="social_media.linkedin"
                                        value={data.social_media.linkedin || ''}
                                        className="mt-1 block w-full"
                                        onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                                    />
                                    <InputError message={errors['social_media.linkedin']} className="mt-2" />
                                </div>
                                <div>
                                    <Label htmlFor="social_media.instagram">Instagram URL</Label>
                                    <Input
                                        id="social_media.instagram"
                                        type="url"
                                        name="social_media.instagram"
                                        value={data.social_media.instagram || ''}
                                        className="mt-1 block w-full"
                                        onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                                    />
                                    <InputError message={errors['social_media.instagram']} className="mt-2" />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="meta_description">Meta Description</Label>
                                <Tiptap description={data.meta_description} onChange={(newContent) => setData('meta_description', newContent)} />
                                <InputError message={errors.meta_description} className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="meta_keywords">Meta Keywords</Label>
                                <Input
                                    id="meta_keywords"
                                    type="text"
                                    name="meta_keywords"
                                    value={data.meta_keywords}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('meta_keywords', e.target.value)}
                                />
                                <InputError message={errors.meta_keywords} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
