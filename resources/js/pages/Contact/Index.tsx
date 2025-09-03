import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import WebLayout from "@/layouts/WebLayout";
import type { AboutProps } from "@/types/About";

// // Fix for default marker icons in Leaflet
// const DefaultIcon = L.icon({
// 	iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
// 	iconRetinaUrl:
// 		"https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
// 	shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
// 	iconSize: [25, 41],
// 	iconAnchor: [12, 41],
// 	popupAnchor: [1, -34],
// 	shadowSize: [41, 41],
// });
// L.Marker.prototype.options.icon = DefaultIcon;

interface BranchProps {
	id: number;
	name: string;
	address: string;
	phone: string;
	email: string;
	latitude: string;
	longitude: string;
}

interface GalleryItem {
	id: number;
	image: string;
	title: string;
	description: string;
}

interface ContactIndexProps {
	about: AboutProps | null;
	branches: BranchProps[];
	galleries: GalleryItem[];
}

const Contact = ({ about, branches, galleries }: ContactIndexProps) => {
	const { data, setData, post, processing, errors, reset } = useForm({
		name: "",
		email: "",
		phone: "",
		subject: "",
		message: "",
	});

	console.log(galleries);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		post(route("contact.store"), {
			onSuccess: () => {
				reset();
			},
			onError: (errors) => {
				console.error("Contact form errors:", errors);
				toast({
					title: "Error sending message",
					description: "Please check your input and try again.",
					variant: "destructive",
				});
			},
		});
	};

	const splitParagraphs = (text: string) => {
		return text.split(/\r?\n/).filter((paragraph) => paragraph.trim() !== "");
	};

	const [bgImage, setBgImage] = useState<string>("");

	const fallbackImage = "/images/logo.png"; // Use your own fallback image URL

	useEffect(() => {
		let intervalId;

		if (Array.isArray(galleries) && galleries.length > 0) {
			const validImages = galleries
				.map((h) => h?.image?.trim())
				.filter((img) => img); // filter out empty or undefined images

			if (validImages.length > 1) {
				// Set an initial image
				setBgImage(validImages[Math.floor(Math.random() * validImages.length)]);

				intervalId = setInterval(() => {
					const randomImage =
						validImages[Math.floor(Math.random() * validImages.length)];
					setBgImage(randomImage);
				}, 5000); // change every 3 seconds
			} else {
				// Only one image or none available
				setBgImage(validImages[0] || fallbackImage);
			}
		} else {
			setBgImage(fallbackImage);
		}

		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	}, [galleries]);

	return (
		<WebLayout>
			<Head title="Contact Us" />

			<style>{`
				.team-hero-bg {
					background-image: linear-gradient(
							to right,
							rgba(0, 70, 173, 0.85),
							rgba(0, 160, 233, 0.85)
						),
						url(${bgImage});
					background-size: cover;
					background-position: center;
				}
			`}</style>
			<div>
				{/* Hero Section */}
				<section className="team-hero-bg text-white py-20 pt-32">
					<div className="container mx-auto px-4">
						<div className="max-w-3xl">
							<h1 className="text-4xl md:text-5xl font-bold mb-6">
								Contact Us
							</h1>
							<p className="text-xl text-white/90">
								Have a project in mind or want to learn more about our services?
								Get in touch with our team.
							</p>
						</div>
					</div>
				</section>

				{/* Contact Form and Info */}
				<section className="py-16">
					<div className="container mx-auto px-4">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
							<div>
								<h2 className="text-2xl font-bold mb-6 text-oki-gray-dark">
									Send Us a Message
								</h2>
								<form onSubmit={handleSubmit} className="space-y-6">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div>
											<label
												htmlFor="name"
												className="block text-sm font-medium text-gray-700 mb-1"
											>
												Full Name *
											</label>
											<Input
												id="name"
												placeholder="John Doe"
												required
												className="w-full"
												value={data.name}
												onChange={(e) => setData("name", e.target.value)}
											/>
											{errors.name && (
												<div className="text-red-500 text-sm mt-1">
													{errors.name}
												</div>
											)}
										</div>
										<div>
											<label
												htmlFor="email"
												className="block text-sm font-medium text-gray-700 mb-1"
											>
												Email Address *
											</label>
											<Input
												id="email"
												type="email"
												placeholder="john@example.com"
												required
												className="w-full"
												value={data.email}
												onChange={(e) => setData("email", e.target.value)}
											/>
											{errors.email && (
												<div className="text-red-500 text-sm mt-1">
													{errors.email}
												</div>
											)}
										</div>
									</div>
									<div>
										<label
											htmlFor="phone"
											className="block text-sm font-medium text-gray-700 mb-1"
										>
											Phone Number
										</label>
										<Input
											id="phone"
											placeholder="+234 123 456 7890"
											className="w-full"
											value={data.phone}
											onChange={(e) => setData("phone", e.target.value)}
										/>
										{errors.phone && (
											<div className="text-red-500 text-sm mt-1">
												{errors.phone}
											</div>
										)}
									</div>
									<div>
										<label
											htmlFor="subject"
											className="block text-sm font-medium text-gray-700 mb-1"
										>
											Subject *
										</label>
										<Input
											id="subject"
											placeholder="Project Inquiry"
											required
											className="w-full"
											value={data.subject}
											onChange={(e) => setData("subject", e.target.value)}
										/>
										{errors.subject && (
											<div className="text-red-500 text-sm mt-1">
												{errors.subject}
											</div>
										)}
									</div>
									<div>
										<label
											htmlFor="message"
											className="block text-sm font-medium text-gray-700 mb-1"
										>
											Message *
										</label>
										<Textarea
											id="message"
											placeholder="Please describe your project or inquiry..."
											required
											className="w-full min-h-[150px]"
											value={data.message}
											onChange={(e) => setData("message", e.target.value)}
										/>
										{errors.message && (
											<div className="text-red-500 text-sm mt-1">
												{errors.message}
											</div>
										)}
									</div>
									<Button
										type="submit"
										className="bg-oki-blue-dark hover:bg-oki-blue-light text-white w-full sm:w-auto px-8 py-6"
										disabled={processing}
									>
										{processing ? "Sending..." : "Send Message"}
									</Button>
								</form>
							</div>

							<div>
								<h2 className="text-2xl font-bold mb-6 text-oki-gray-dark">
									Contact Information
								</h2>

								<div className="bg-oki-gray-light rounded-lg p-6 mb-8">
									{about ? (
										<>
											<h3 className="text-xl font-semibold mb-4 text-oki-gray-dark">
												Head Office
											</h3>
											<ul className="space-y-4">
												<li className="flex">
													<MapPin
														className="text-oki-blue-dark mr-3 flex-shrink-0 mt-1"
														size={20}
													/>
													<span className="text-gray-600">{about.address}</span>
												</li>
												<li className="flex">
													<Phone
														className="text-oki-blue-dark mr-3 flex-shrink-0 mt-1"
														size={20}
													/>
													{about.phone &&
														splitParagraphs(about.phone).map((phone, index) => (
															<span
																key={`about-phone-${index}`}
																className="text-gray-600 mr-4"
															>
																{phone}
															</span>
														))}
												</li>
												<li className="flex">
													<Mail
														className="text-oki-blue-dark mr-3 flex-shrink-0 mt-1"
														size={20}
													/>
													{about.email &&
														splitParagraphs(about.email).map((email, index) => (
															<span
																key={`about-email-${index}`}
																className="text-gray-600 mr-4"
															>
																{email}
															</span>
														))}
												</li>
												<li className="flex">
													<Clock
														className="text-oki-blue-dark mr-3 flex-shrink-0 mt-1"
														size={20}
													/>
													<span className="text-gray-600">
														Monday - Friday: 8:00 AM - 5:00 PM
													</span>
													<span className="text-gray-600">
														Saturday: 8:00 AM - 3:00 PM
													</span>
												</li>
											</ul>
										</>
									) : (
										<p>Loading...</p>
									)}
								</div>

								{branches.length > 0 && (
									<div className="bg-oki-gray-light rounded-lg p-6">
										<h3 className="text-xl font-semibold mb-4 text-oki-gray-dark">
											Our Branches
										</h3>
										{branches.map((branch) => (
											<div key={branch.id} className="mb-6 last:mb-0">
												<h4 className="text-lg font-medium mb-2 text-oki-gray-dark">
													{branch.name}
												</h4>
												<ul className="space-y-2">
													<li className="flex">
														<MapPin
															className="text-oki-blue-dark mr-3 flex-shrink-0 mt-1"
															size={20}
														/>
														<span
															className="text-gray-600"
															dangerouslySetInnerHTML={{
																__html: branch.address,
															}}														                                                        />
													</li>
													<li className="flex">
														<Phone
															className="text-oki-blue-dark mr-3 flex-shrink-0 mt-1"
															size={20}
														/>
														{branch.phone &&
															splitParagraphs(branch.phone).map(
																(phone, index) => (
																	<span
																		key={`branch-phone-${branch.id}-${index}`}
																		className="text-gray-600 mr-4"
																	>
																		{phone}
																	</span>
																),
															)}
													</li>
													<li className="flex">
														<Mail
															className="text-oki-blue-dark mr-3 flex-shrink-0 mt-1"
															size={20}
														/>
														{branch.email &&
															splitParagraphs(branch.email).map(
																(email, index) => (
																	<span
																		key={`branch-email-${branch.id}-${index}`}
																		className="text-gray-600 mr-4"
																	>
																		{email}
																	</span>
																),
															)}
													</li>
												</ul>
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				</section>

				{/* Map Section */}
				<section className="py-10">
					<div className="container mx-auto px-4">
						<h2 className="text-2xl font-bold mb-6 text-oki-gray-dark">
							Our Location
						</h2>
						<div className="bg-oki-gray-light h-96 rounded-lg overflow-hidden">
							{/* <MapContainer
								center={about && about.latitude && about.longitude ? [parseFloat(about.latitude), parseFloat(about.longitude)] : [4.8156, 7.0498]} // Default coordinates (Nigeria center)
								zoom={6}
								style={{ height: "100%", width: "100%" }}
							>
								<TileLayer
									url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
									attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								/>
								{about && about.latitude && about.longitude && (
									<Marker
										position={[
											parseFloat(about.latitude),
											parseFloat(about.longitude),
										]}
									>
										<Popup>
											<strong>Head Office</strong>
											<br />
											{about.address}
										</Popup>
									</Marker>
								)}
								{branches.length > 0 &&
									branches.map(
										(branch, index) =>
											branch.latitude &&
											branch.longitude && (
												<Marker
														key={`branch-${index}`}
														position={[
															parseFloat(branch.latitude),
															parseFloat(branch.longitude),
														]}
												>
													<Popup>
														<strong>{branch.name}</strong>
														<br />
														{branch.address}
													</Popup>

													</Marker>
												)
									)
						)}
							</MapContainer> */}
						</div>
					</div>
				</section>
			</div>
		</WebLayout>
	);
};

export default Contact;
