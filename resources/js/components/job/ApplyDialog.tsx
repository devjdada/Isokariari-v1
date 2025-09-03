import { useState } from "react";
import * as z from "zod";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@inertiajs/react";
import { JobListing } from "@/types/JobListing";

const formSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	phone: z.string().min(10, "Invalid phone number"),
	pay: z.string().min(3, "Invalid Expected Pay"),
	location: z.string().min(3, "Invalid Location"),
	cover_letter: z.string().min(5, "Cover Letter too short"),
	resume: z
		.custom<File>()
		.refine((file) => file instanceof File, "CV is required")
		.refine((file) => file.type === "application/pdf", "Must be a PDF file"),
	certifications: z
		.custom<File>()
		.refine((file) => file instanceof File, "Certifications is required")
		.refine((file) => file.type === "application/pdf", "Must be a PDF file"),
});

interface ApplyDialogProps {
	job: JobListing;
	label: string;
}

export function ApplyDialog({ job, label }: ApplyDialogProps) {
	const [open, setOpen] = useState(false);

	const { data, setData, post, processing, errors, reset } = useForm({
		name: "",
		email: "",
		phone: "",
		cover_letter: "",
		pay: "",
		location: "",
		job_listing_id: job.id === "0" ? null : job.id,
		resume: null as File | null,
		certifications: null as File | null,
	});

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		post(route("applications.store"), {
			onSuccess: () => {
				setOpen(false);
				reset();
			},
			onError: (errors) => {
				console.error("Application submission errors:", errors);
			},
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{job.id === "0" ? (
					<span className="inline-block cursor-pointer bg-white text-oki-blue-dark hover:bg-white/90 font-semibold px-8 py-4 rounded-md transition-colors">
						Send Open Application
					</span>
				) : (
					<Button
						className={"bg-oki-blue-dark hover:bg-oki-blue-light text-white"}
					>
						{label}
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Apply for {job.title}</DialogTitle>
				</DialogHeader>
				<form onSubmit={onSubmit} className="space-y-4">
					<div>
						<Label htmlFor="name">Full Name</Label>
						<Input
							id="name"
							type="text"
							name="name"
							value={data.name}
							className="mt-1 block w-full"
							onChange={(e) => setData("name", e.target.value)}
							required
						/>
						{errors.name && (
							<div className="text-red-500 text-sm mt-1">{errors.name}</div>
						)}
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								name="email"
								value={data.email}
								className="mt-1 block w-full"
								onChange={(e) => setData("email", e.target.value)}
								required
							/>
							{errors.email && (
								<div className="text-red-500 text-sm mt-1">{errors.email}</div>
							)}
						</div>

						<div>
							<Label htmlFor="phone">Phone</Label>
							<Input
								id="phone"
								type="text"
								name="phone"
								value={data.phone}
								className="mt-1 block w-full"
								onChange={(e) => setData("phone", e.target.value)}
								required
							/>
							{errors.phone && (
								<div className="text-red-500 text-sm mt-1">{errors.phone}</div>
							)}
						</div>
					</div>

					<div>
						<Label htmlFor="cover_letter">Cover Letter</Label>
						<Textarea
							id="cover_letter"
							name="cover_letter"
							value={data.cover_letter}
							className="mt-1 block w-full"
							onChange={(e) => setData("cover_letter", e.target.value)}
							required
							rows={5}
						/>
						{errors.cover_letter && (
							<div className="text-red-500 text-sm mt-1">{errors.cover_letter}</div>
						)}
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor="resume">CV/Resume (PDF only)</Label>
							<Input
								id="resume"
								type="file"
								name="resume"
								className="mt-1 block w-full"
								onChange={(e) => setData("resume", e.target.files?.[0] || null)}
								accept=".pdf,application/pdf"
								required
							/>
							{errors.resume && (
								<div className="text-red-500 text-sm mt-1">{errors.resume}</div>
							)}
						</div>

						<div>
							<Label htmlFor="certifications">Certifications (PDF only)</Label>
							<Input
								id="certifications"
								type="file"
								name="certifications"
								className="mt-1 block w-full"
								onChange={(e) => setData("certifications", e.target.files?.[0] || null)}
								accept=".pdf,application/pdf"
							/>
							{errors.certifications && (
								<div className="text-red-500 text-sm mt-1">{errors.certifications}</div>
							)}
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor="pay">Expected Pay</Label>
							<Input
								id="pay"
								type="number"
								name="pay"
								value={data.pay}
								className="mt-1 block w-full"
								onChange={(e) => setData("pay", e.target.value)}
							/>
							{errors.pay && (
								<div className="text-red-500 text-sm mt-1">{errors.pay}</div>
							)}
						</div>

						<div>
							<Label htmlFor="location">Current Location</Label>
							<Input
								id="location"
								type="text"
								name="location"
								value={data.location}
								className="mt-1 block w-full"
								onChange={(e) => setData("location", e.target.value)}
							/>
							{errors.location && (
								<div className="text-red-500 text-sm mt-1">{errors.location}</div>
							)}
						</div>
					</div>

					<Button type="submit" disabled={processing}>
						{processing ? "Submitting..." : "Submit Application"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
