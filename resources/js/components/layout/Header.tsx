import { Link, usePage } from "@inertiajs/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

// Laravel will pass `pages` via Inertia props
interface Page {
	id: number;
	title: string;
	slug: string;
}

interface Props {
	pPages: Page[];
}

export default function Header() {
	const { url, props } = usePage<{
		sharedPages: Page[];
		sharedAbout: CompanyInfo | null;
	}>();
	const [isScrolled, setIsScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const isMobile = useIsMobile();
	const pages = props.sharedPages || [];

	// Determine if current page has a hero background
	const hasHeroBackground =
		[
			"/teams",
			"/",
			"/about",
			"/certifications",
			"/careers",
			"/contact",
			"/clients",
			"/equipment",
			"/gallery",
			"/privacy",
		].includes(url) ||
		url.startsWith("/services") ||
		url.startsWith("/projects") ||
		url.startsWith("/blogs") ||
		url.startsWith("/pages");

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

	// Nav items
	const navItems = [
		{ name: "Home", path: "/" },
		{ name: "Services", path: "/services" },
		{ name: "Projects", path: "/projects" },
		{ name: "Blog", path: "/blogs" },
		{ name: "Careers", path: "/careers" },
	];

	// About links (static + dynamic from Laravel pages)
	const aboutLinks = [
		{ name: "About Us", path: "/about" },
		{ name: "Our Team", path: "/teams" },
		...pages.map((page) => ({
			name: page.title,
			path: `/pages/${page.slug}`,
		})),
	];

	return (
		<header
			className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
				isScrolled || !hasHeroBackground
					? "bg-white py-2 shadow-md"
					: "bg-transparent py-4"
			}`}
		>
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between">
					<Link href="/" className="flex items-center">
						<img
							src={
								isScrolled
									? "/images/logo-with-black-text.png"
									: "/images/logo-with-white-text.png"
							}
							alt="O.K. Isokariari Nigeria Limited"
							className="h-12 object-contain transition-all duration-300"
						/>
					</Link>

					{isMobile ? (
						// Mobile toggle
						<Button
							onClick={toggleMobileMenu}
							className={`block p-2 ${isScrolled || !hasHeroBackground ? "text-oki-gray-dark" : "text-white"}`}
							aria-label="Toggle menu"
						>
							{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</Button>
					) : (
						// Desktop navigation
						<nav className="hidden items-center space-x-6 lg:flex">
							{navItems.map((item) => (
								<Link
									key={item.name}
									href={item.path}
									className={`font-medium transition-colors hover:text-oki-red ${
										isScrolled || !hasHeroBackground
											? "text-oki-gray-dark"
											: "text-white"
									}`}
								>
									{item.name}
								</Link>
							))}

							{/* About Dropdown */}
							<DropdownMenu>
								<DropdownMenuTrigger
									className={`flex items-center font-medium transition-colors hover:text-oki-red focus:outline-none ${
										isScrolled || !hasHeroBackground
											? "text-oki-gray-dark"
											: "text-white"
									}`}
								>
									About <ChevronDown className="ml-1 h-4 w-4" />
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="center"
									className="w-48 bg-white text-black "
								>
									{aboutLinks.map((link) => (
										<DropdownMenuItem
											key={link.name}
											className="hover:bg-oki-blue-light"
											asChild
										>
											<Link href={link.path} className="flex w-full hover:text-white">
												{link.name}
											</Link>
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>

							<div className="flex items-center space-x-3">
								<Link href="/contact">
									<Button className="bg-oki-red text-white hover:bg-oki-red/90">
										Contact Us
									</Button>
								</Link>
							</div>
						</nav>
					)}
				</div>

				{/* Mobile menu */}
				{isMobile && mobileMenuOpen && (
					<div className="animate-fade-in absolute top-full left-0 w-full border-t border-gray-200 bg-white px-4 py-4 shadow-lg">
						<nav className="flex flex-col space-y-4">
							{navItems.map((item) => (
								<Link
									key={item.name}
									href={item.path}
									className="py-2 font-medium text-oki-gray-dark transition-colors hover:text-oki-red"
									onClick={() => setMobileMenuOpen(false)}
								>
									{item.name}
								</Link>
							))}

							{/* About section in mobile */}
							<div className="border-t border-gray-200 pt-3">
								<h3 className="mb-2 font-medium text-oki-gray-dark">About</h3>
								{aboutLinks.map((link) => (
									<Link
										key={link.name}
										href={link.path}
										className="block py-2 pl-3 text-oki-gray-dark transition-colors hover:text-oki-red"
										onClick={() => setMobileMenuOpen(false)}
									>
										{link.name}
									</Link>
								))}
							</div>

							<Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
								<Button className="w-full bg-oki-red text-white hover:bg-oki-red/90">
									Contact Us
								</Button>
							</Link>
						</nav>
					</div>
				)}
			</div>
		</header>
	);
}
