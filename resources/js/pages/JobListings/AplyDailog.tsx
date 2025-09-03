import { useForm } from "@inertiajs/react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface JobListing {
	id: number | string;
	title: string;
}

interface ApplyDialogProps {
	job: JobListing;
	label: string;
}

export default function ApplyDialog({ job, label }: ApplyDialogProps) {
	const [open, setOpen] = useState(false);

	const { data, setData, post, processing, reset, errors } = useForm({
		job_listings_id: job.id,
		full_name: "",
		email: "",
		phone: "",
		pay: "",
		location: "",
		cover: "",
		cv: null as File | null,
		letter: null as File | null,
	});

	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(data);
		post(route("applications.store"), {
			forceFormData: true,
			onSuccess: () => {
				reset();
				setOpen(false);
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
					<Button className="bg-oki-blue-dark hover:bg-oki-blue-light text-white">
						{label}
					</Button>
				)}
			</DialogTrigger>

			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Apply for {job.title}</DialogTitle>
				</DialogHeader>

				<form onSubmit={submit} className="space-y-4">
					<div>
						<Label>Full Name</Label>
						<Input
							value={data.full_name}
							onChange={(e) => setData("full_name", e.target.value)}
						/>
						{errors.full_name && (
							<div className="text-red-500">{errors.full_name}</div>
						)}
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label>Email</Label>
							<Input
								type="email"
								value={data.email}
								onChange={(e) => setData("email", e.target.value)}
							/>
							{errors.email && (
								<div className="text-red-500">{errors.email}</div>
							)}
						</div>

						<div>
							<Label>Phone</Label>
							<Input
								value={data.phone}
								onChange={(e) => setData("phone", e.target.value)}
							/>
							{errors.phone && (
								<div className="text-red-500">{errors.phone}</div>
							)}
						</div>
					</div>

					<div>
						<Label>Cover Letter</Label>
						<Textarea
							value={data.cover}
							onChange={(e) => setData("cover", e.target.value)}
						/>
						{errors.cover && <div className="text-red-500">{errors.cover}</div>}
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label>
								CV/Resume (PDF) <span className="text-red-500">*</span>
							</Label>
							<Input
								type="file"
								accept="application/pdf"
								onChange={(e) => setData("cv", e.target.files?.[0] || null)}
							/>
							{errors.cv && <div className="text-red-500">{errors.cv}</div>}
						</div>

						<div>
							<Label>
								Certifications (PDF) <span className="text-red-500">*</span>
							</Label>
							<Input
								type="file"
								accept="application/pdf"
								onChange={(e) => setData("letter", e.target.files?.[0] || null)}
							/>
							{errors.letter && (
								<div className="text-red-500">{errors.letter}</div>
							)}
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label>Expected Pay</Label>
							<Input
								type="number"
								value={data.pay}
								onChange={(e) => setData("pay", e.target.value)}
							/>
							{errors.pay && <div className="text-red-500">{errors.pay}</div>}
						</div>

						<div>
							<Label>Current Location</Label>
							<Input
								value={data.location}
								onChange={(e) => setData("location", e.target.value)}
							/>
							{errors.location && (
								<div className="text-red-500">{errors.location}</div>
							)}
						</div>
					</div>

					<Button
						type="submit"
						disabled={processing || !data.cv || !data.letter}
					>
						{processing ? "Submitting..." : "Submit Application"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
