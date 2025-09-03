import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Tiptap from "@/components/editor/tiptap";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import type { PageProps } from "@/types";
import type { AboutProps } from "@/types/About";

interface ManageAboutProps extends PageProps {
	about: AboutProps;
}

export default function ManageAbout({ auth, about }: ManageAboutProps) {
	const { data, setData, post, processing, errors, reset } = useForm({
		title: about.title || "",
		about: about.about || "",
		history: about.history || "",
		achivement: about.achivement || "",
		purpose: about.purpose || "",
		value: about.value || "",
		image: null as File | null,
		logo: null as File | null,
		logo2: null as File | null,
		vision: about.vision || "",
		mission: about.mission || "",
		phone: about.phone || "",
		email: about.email || "",
		address: about.address || "",
		facebook: about.facebook || "",
		twitter: about.twitter || "",
		instagram: about.instagram || "",
		linkedin: about.linkedin || "",
	});

	const [imagePreview, setImagePreview] = useState<string | null>(
		about.image || null,
	);
	const [logoPreview, setLogoPreview] = useState<string | null>(
		about.logo || null,
	);
	const [logo2Preview, setLogo2Preview] = useState<string | null>(
		about.logo2 || null,
	);

	const handleFileChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		fieldName: "image" | "logo" | "logo2",
	) => {
		const file = e.target.files?.[0] || null;
		setData(fieldName, file);

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				if (fieldName === "image") setImagePreview(reader.result as string);
				else if (fieldName === "logo") setLogoPreview(reader.result as string);
				else if (fieldName === "logo2")
					setLogo2Preview(reader.result as string);
			};
			reader.readAsDataURL(file);
		} else {
			if (fieldName === "image") setImagePreview(null);
			else if (fieldName === "logo") setLogoPreview(null);
			else if (fieldName === "logo2") setLogo2Preview(null);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		post(route("admin.about.update"), {
			forceFormData: true,
			onSuccess: () => {
				// Optionally, show a success message or refresh data
			},
			onError: (errors) => {
				console.error("Update errors:", errors);
			},
		});
	};

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<h2 className="font-semibold text-xl text-gray-800 leading-tight">
					Manage About Page
				</h2>
			}
		>
			<Head title="Manage About Page" />

			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className=" overflow-hidden shadow-sm sm:rounded-lg p-6">
						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<Label htmlFor="title">Title</Label>
								<Input
									id="title"
									type="text"
									name="title"
									value={data.title}
									className="mt-1 block w-full"
									onChange={(e) => setData("title", e.target.value)}
								/>
								<InputError message={errors.title} className="mt-2" />
							</div>

							<div>
								<Label htmlFor="about">About Content</Label>
								<Textarea
									id="about"
									name="about"
									value={data.about}
									className="mt-1 block w-full"
									onChange={(e) => setData("about", e.target.value)}
									required
								/>
								<InputError message={errors.about} className="mt-2" />
							</div>

							<div>
								<Label htmlFor="history">History</Label>
								<Tiptap
									description={data.history}
									onChange={(newContent) => setData("history", newContent)}
								/>
								<InputError message={errors.history} className="mt-2" />
							</div>

							<div>
								<Label htmlFor="achivement">Achievement</Label>
								<Tiptap
									description={data.achivement}
									onChange={(newContent) => setData("achivement", newContent)}
								/>
								<InputError message={errors.achivement} className="mt-2" />
							</div>

							<div>
								<Label htmlFor="purpose">Purpose</Label>
								<Tiptap
									description={data.purpose}
									onChange={(newContent) => setData("purpose", newContent)}
								/>
								<InputError message={errors.purpose} className="mt-2" />
							</div>

							<div>
								<Label htmlFor="value">Value</Label>
								<Tiptap
									description={data.value}
									onChange={(newContent) => setData("value", newContent)}
								/>
								<InputError message={errors.value} className="mt-2" />
							</div>

							<div>
								<Label htmlFor="vision">Vision</Label>
								<Tiptap
									description={data.vision}
									onChange={(newContent) => setData("vision", newContent)}
								/>
								<InputError message={errors.vision} className="mt-2" />
							</div>

							<div>
								<Label htmlFor="mission">Mission</Label>
								<Tiptap
									description={data.mission}
									onChange={(newContent) => setData("mission", newContent)}
								/>

								<InputError message={errors.mission} className="mt-2" />
							</div>

							{/* Image Uploads */}
							<div>
								<Label htmlFor="image">Main Image</Label>
								<Input
									id="image"
									type="file"
									name="image"
									className="mt-1 block w-full"
									onChange={(e) => handleFileChange(e, "image")}
									accept="image/*"
								/>
								<InputError message={errors.image} className="mt-2" />
								{imagePreview && (
									<div className="mt-4">
										<img
											src={imagePreview}
											alt="Main Image Preview"
											className="h-32 w-full object-cover rounded-md"
										/>
									</div>
								)}
							</div>

							<div>
								<Label htmlFor="logo">Logo</Label>
								<Input
									id="logo"
									type="file"
									name="logo"
									className="mt-1 block w-full"
									onChange={(e) => handleFileChange(e, "logo")}
									accept="image/*"
								/>
								<InputError message={errors.logo} className="mt-2" />
								{logoPreview && (
									<div className="mt-4">
										<img
											src={logoPreview}
											alt="Logo Preview"
											className="h-32 w-full object-cover rounded-md"
										/>
									</div>
								)}
							</div>

							<div>
								<Label htmlFor="logo2">Secondary Logo</Label>
								<Input
									id="logo2"
									type="file"
									name="logo2"
									className="mt-1 block w-full"
									onChange={(e) => handleFileChange(e, "logo2")}
									accept="image/*"
								/>
								<InputError message={errors.logo2} className="mt-2" />
								{logo2Preview && (
									<div className="mt-4">
										<img
											src={logo2Preview}
											alt="Secondary Logo Preview"
											className="h-32 w-full object-cover rounded-md"
										/>
									</div>
								)}
							</div>

							{/* Contact Info */}
							<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
								<div>
									<Label htmlFor="phone">Phone</Label>
									<Textarea
										id="phone"
										name="phone"
										value={data.phone}
										className="mt-1 block w-full"
										onChange={(e) => setData("phone", e.target.value)}
									/>
									<InputError message={errors.phone} className="mt-2" />
								</div>

								<div>
									<Label htmlFor="email">Email</Label>
									<Textarea
										id="email"
										name="email"
										value={data.email}
										className="mt-1 block w-full"
										onChange={(e) => setData("email", e.target.value)}
									/>
									<InputError message={errors.email} className="mt-2" />
								</div>

								<div>
									<Label htmlFor="address">Address</Label>
									<Textarea
										id="address"
										name="address"
										value={data.address}
										className="mt-1 block w-full"
										onChange={(e) => setData("address", e.target.value)}
									/>
									<InputError message={errors.address} className="mt-2" />
								</div>
							</div>

							{/* Social Media */}
							<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
								<div>
									<Label htmlFor="facebook">Facebook URL</Label>
									<Input
										id="facebook"
										type="url"
										name="facebook"
										value={data.facebook}
										className="mt-1 block w-full"
										onChange={(e) => setData("facebook", e.target.value)}
									/>
									<InputError message={errors.facebook} className="mt-2" />
								</div>

								<div>
									<Label htmlFor="twitter">Twitter URL</Label>
									<Input
										id="twitter"
										type="url"
										name="twitter"
										value={data.twitter}
										className="mt-1 block w-full"
										onChange={(e) => setData("twitter", e.target.value)}
									/>
									<InputError message={errors.twitter} className="mt-2" />
								</div>

								<div>
									<Label htmlFor="instagram">Instagram URL</Label>
									<Input
										id="instagram"
										type="url"
										name="instagram"
										value={data.instagram}
										className="mt-1 block w-full"
										onChange={(e) => setData("instagram", e.target.value)}
									/>
									<InputError message={errors.instagram} className="mt-2" />
								</div>

								<div>
									<Label htmlFor="linkedin">LinkedIn URL</Label>
									<Input
										id="linkedin"
										type="url"
										name="linkedin"
										value={data.linkedin}
										className="mt-1 block w-full"
										onChange={(e) => setData("linkedin", e.target.value)}
									/>
									<InputError message={errors.linkedin} className="mt-2" />
								</div>
							</div>

							<div className="flex items-center gap-4">
								<Button type="submit" disabled={processing}>
									{processing ? "Saving..." : "Save Changes"}
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
