import { Link, usePage } from "@inertiajs/react";
import {
	Facebook,
	Instagram,
	Linkedin,
	Mail,
	MapPin,
	PhoneCall,
	Twitter,
} from "lucide-react";
import type { SharedData } from "@/types";

export default function Footer() {
	const page = usePage<SharedData>();
	const { sharedAbout, sharedServices } = page.props;

	const splitParagraphs = (text: string) => {
		if (!text) return [];
		return text.split("\r\n").filter((paragraph) => paragraph.trim() !== "");
	};

	return (
		<footer className="bg-oki-gray-dark pt-16 pb-8 text-white">
			<div className="container mx-auto px-4">
				<div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
					{/* Company Info */}
					<div>
						<Link href="/" className="mb-6 inline-block">
							<img
								src="/images/logo-with-white-text.png"
								alt="O.K. Isokariari Nigeria Limited"
								className="h-12 object-contain"
							/>
						</Link>

						{sharedAbout?.about && (
							<p
								className="mb-4 leading-relaxed text-white/90"
								dangerouslySetInnerHTML={{
									__html:
										sharedAbout.about.slice(0, 300) +
										(sharedAbout.about.length > 300 ? "..." : ""),
								}}
							/>
						)}
						<div className="flex items-center space-x-3">
							{sharedAbout?.facebook && (
								<a
									href={sharedAbout.facebook}
									target="_blank"
									rel="noopener noreferrer"
									className={`transition-colors hover:text-oki-red `}
								>
									<Facebook size={20} />
								</a>
							)}
							{sharedAbout?.twitter && (
								<a
									href={sharedAbout.twitter}
									target="_blank"
									rel="noopener noreferrer"
									className={`transition-colors hover:text-oki-red `}
								>
									<Twitter size={20} />
								</a>
							)}
							{sharedAbout?.linkedin && (
								<a
									href={sharedAbout.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className={`transition-colors hover:text-oki-red `}
								>
									<Linkedin size={20} />
								</a>
							)}
							{sharedAbout?.instagram && (
								<a
									href={sharedAbout.instagram}
									target="_blank"
									rel="noopener noreferrer"
									className={`transition-colors hover:text-oki-red `}
								>
									<Instagram size={20} />
								</a>
							)}
						</div>
					</div>

					{/* Services */}
					<div>
						<h3 className="mb-6 text-xl font-semibold">Services</h3>
						<ul className="space-y-3">
							{sharedServices?.map((s) => (
								<li key={`serv-${s.id}`}>
									<Link
										href={`/services/${s.slug}`}
										className="text-gray-400 transition-colors hover:text-white"
									>
										{s.title}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Useful Links */}
					<div>
						<h3 className="mb-6 text-xl font-semibold">Useful Links</h3>
						<ul className="space-y-3">
							<li>
								<Link
									href="/about"
									className="text-gray-400 transition-colors hover:text-white"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="/projects"
									className="text-gray-400 transition-colors hover:text-white"
								>
									Projects
								</Link>
							</li>
							<li>
								<Link
									href="/teams"
									className="text-gray-400 transition-colors hover:text-white"
								>
									Our Team
								</Link>
							</li>
							<li>
								<Link
									href="/blogs"
									className="text-gray-400 transition-colors hover:text-white"
								>
									Blog
								</Link>
							</li>
							<li>
								<Link
									href="/careers"
									className="text-gray-400 transition-colors hover:text-white"
								>
									Careers
								</Link>
							</li>
							<li>
								<Link
									href="/clients"
									className="text-gray-400 transition-colors hover:text-white"
								>
									Our Clients
								</Link>
							</li>
							<li>
								<Link
									href="/gallery"
									className="text-gray-400 transition-colors hover:text-white"
								>
									Our Gallery
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact */}
					{sharedAbout && (
						<div>
							<h3 className="mb-6 text-xl font-semibold">Contact</h3>
							<ul className="space-y-4">
								{sharedAbout.address && (
									<li className="flex items-start">
										<MapPin
											className="mt-1 mr-3 flex-shrink-0 text-oki-blue-light"
											size={18}
										/>
										<span
											className="text-gray-400"
											dangerouslySetInnerHTML={{
												__html: sharedAbout.address,
											}}
										/>
									</li>
								)}
								{sharedAbout.phone &&
									splitParagraphs(sharedAbout.phone).map((phone, index) => (
										<li key={`phone-${index}`} className="flex items-center">
											<PhoneCall
												className="mr-3 flex-shrink-0 text-oki-blue-light"
												size={18}
											/>
											<a
												href={`tel:${phone}`}
												className="text-gray-400 transition-colors hover:text-white"
											>
												{phone}
											</a>
										</li>
									))}
								{sharedAbout.email &&
									splitParagraphs(sharedAbout.email).map((email, index) => (
										<li key={`email-${index}`} className="flex items-center">
											<Mail
												className="mr-3 flex-shrink-0 text-oki-blue-light"
												size={18}
											/>
											<a
												href={`mailto:${email}`}
												className="text-gray-400 transition-colors hover:text-white"
											>
												{email}
											</a>
										</li>
									))}
							</ul>
						</div>
					)}
				</div>

				{/* Bottom */}
				<div className="border-t border-gray-700 pt-8">
					<div className="flex flex-col items-center justify-between md:flex-row">
						<p className="mb-4 text-sm text-gray-400 md:mb-0">
							&copy; {new Date().getFullYear()} O.K. Isokariari Nigeria Limited.
							All rights reserved.
						</p>
						<div className="flex space-x-6">
							<Link
								href="/privacy-policy"
								className="text-sm text-gray-400 transition-colors hover:text-white"
							>
								Privacy Policy
							</Link>
							<Link
								href="/terms-of-service"
								className="text-sm text-gray-400 transition-colors hover:text-white"
							>
								Terms of Service
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
