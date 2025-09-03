import { Link, usePage } from "@inertiajs/react";
import {
	Briefcase,
	Building,
	FileSpreadsheet,
	FileText,
	Folder,
	Home,
	Image,
	Info,
	Layers,
	LayoutGrid,
	MessageSquare,
	MonitorSmartphone,
	Settings,
	User,
	Users,
} from "lucide-react";
import { NavFooter } from "@/components/nav-footer";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { NavItem, SharedData } from "@/types";

const mainNavItems: NavItem[] = [
	{
		title: "Dashboard",
		href: route("dashboard"),
		icon: LayoutGrid,
		roles: ["admin", "user", "editor", "hr"], // All roles
	},
	{
		title: "Projects",
		href: route("admin.projects.index"),
		icon: Briefcase,
		roles: ["admin", "editor"],
	},
	{
		title: "Blogs",
		href: route("admin.blogs.index"),
		icon: FileText,
		roles: ["admin", "editor"],
	},
	{
		title: "Services",
		href: route("admin.services.index"),
		icon: Layers,
		roles: ["admin", "editor"],
	},
	{
		title: "Pages",
		href: route("admin.pages.index"),
		icon: FileText,
		roles: ["admin"],
	},
	{
		title: "Job Listings",
		href: route("admin.job-listings.index"),
		icon: FileSpreadsheet,
		roles: ["admin", "hr"],
	},
	{
		title: "Clients",
		href: route("admin.clients.index"),
		icon: Users,
		roles: ["admin"],
	},
	{
		title: "Teams",
		href: route("admin.teams.index"),
		icon: Users,
		roles: ["admin"],
	},
	{
		title: "Testimonies",
		href: route("admin.testimonies.index"),
		icon: MessageSquare,
		roles: ["admin"],
	},
	{
		title: "Equipment",
		href: route("admin.equipment.index"),
		icon: MonitorSmartphone,
		roles: ["admin"],
	},
	{
		title: "Branches",
		href: route("admin.branches.index"),
		icon: Building,
		roles: ["admin"],
	},
	{
		title: "Categories",
		href: route("admin.categories.index"),
		icon: Layers,
		roles: ["admin"],
	},
	{
		title: "Company Info",
		href: route("admin.company-info.manage"),
		icon: Info,
		roles: ["admin"],
	},
	{
		title: "About Page",
		href: route("admin.about.manage"),
		icon: Home,
		roles: ["admin"],
	},
	{
		title: "Hero Content",
		href: route("admin.hero-contents.index"),
		icon: Image,
		roles: ["admin"],
	},
	{
		title: "Applications",
		href: route("admin.applications.index"),
		icon: FileSpreadsheet,
		roles: ["admin", "hr"],
	},
	{
		title: "Users",
		href: route("admin.users.index"),
		icon: User,
		roles: ["admin"],
	},
	{
		title: "Photos",
		href: route("admin.photos.index"),
		icon: Image,
		roles: ["admin"],
	},
	{
		title: "Profile",
		href: route("admin.profile.index"),
		icon: Settings,
		roles: ["admin", "user", "editor", "hr"], // All roles
	},
];

export function AppSidebar() {
	const { auth } = usePage<SharedData>().props;
	const userRole = auth.user?.role;

	const filteredNavItems = mainNavItems.filter((item) => {
		if (!item.roles) {
			// If roles are not defined, assume it's accessible by admin by default or all if it's a general item
			return userRole === "admin";
		}
		return item.roles.includes(userRole);
	});

	return (
		<Sidebar collapsible="icon" variant="inset">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link href="/dashboard" prefetch>
								<img
									src={"/images/logo.png"}
									alt="App Logo"
									className="h-10 w-auto"
								/>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<NavMain items={filteredNavItems} />
			</SidebarContent>

			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
