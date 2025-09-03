import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Tiptap from "@/components/editor/tiptap";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import type { PageProps } from "@/types";
import { Switch } from "@/components/ui/switch";

interface PageFormData {
	title: string;
	contents: string;
	image: File | null;
	more: string;
    status: boolean;
}

const slugify = (text: string) => {
	return text
		.toString()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.trim()
		.replace(/\s+/g, "-")
		.replace(/[^\w-]+/g, "")
		.replace(/--+/g, "-");
};

export default function PageCreate({ auth }: PageProps) {
	const { data, setData, post, processing, errors, reset } =
		useForm<PageFormData>({
			title: "",
			contents: "",
			image: null,
			slug: "",
			more: "",
			status: false,
		});

	const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

	useEffect(() => {
		if (data.title) {
			setData("slug", slugify(data.title));
		}
	}, [data.title]);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setData("image", file);

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreviewUrl(reader.result as string);
			};
			reader.readAsDataURL(file);
		} else {
			setImagePreviewUrl(null);
		}
	};

	const submit = (e: React.FormEvent) => {
		e.preventDefault();

		post(route("admin.pages.store"), {
			onSuccess: () => {
				reset();
				setImagePreviewUrl(null);
			},
		});
	};

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<h2 className="text-xl leading-tight font-semibold text-gray-800">
					Create Page
				</h2>
			}
		>
			<Head title="Create Page" />

			<div className="py-12">
				<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="overflow-hidden bg-card p-6 shadow-sm sm:rounded-lg">
						<form onSubmit={submit} className="mt-6 space-y-6">
							<div>
								<Label htmlFor="title">Page Title</Label>
								<Input
									id="title"
									type="text"
									name="title"
									value={data.title}
									className="mt-1 block w-full"
									autoComplete="title"
									onChange={(e) => setData("title", e.target.value)}
									required
								/>
								<InputError message={errors.title} className="mt-2" />
							</div>

							<div>
								<Label htmlFor="contents">Page Contents</Label>
								<Tiptap
									description={data.contents}
									onChange={(newContent) => setData("contents", newContent)}
								/>
								<InputError message={errors.contents} className="mt-2" />
							</div>

							<div>
								<Label htmlFor="image">Main Image</Label>
								<Input
									id="image"
									type="file"
									name="image"
									className="mt-1 block w-full"
									onChange={handleImageChange}
									accept="image/*"
								/>
								<InputError message={errors.image} className="mt-2" />
								{imagePreviewUrl && (
									<div className="mt-4">
										<img
											src={imagePreviewUrl}
											alt="Image Preview"
											className="h-auto max-w-xs rounded-md"
										/>
									</div>
								)}
							</div>

							<div>
								<Label htmlFor="status">Status</Label>
								<Switch
									id="status"
									checked={data.status}
									onCheckedChange={(checked) => setData("status", checked)}
								/>
								<InputError message={errors.status} className="mt-2" />
							</div>

							<div>
								<Label htmlFor="more">More Details (Optional)</Label>
								<Tiptap
									description={data.more}
									onChange={(newContent) => setData("more", newContent)}
								/>
								<InputError message={errors.more} className="mt-2" />
							</div>

							<div className="flex items-center gap-4">
								<Button type="submit" disabled={processing}>
									{processing ? "Creating..." : "Create Page"}
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
