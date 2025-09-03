import type { LucideIcon } from "lucide-react";
import type { Config } from "ziggy-js";
import type { AboutProps } from "./About";

export interface Auth {
	user: User;
}

export interface BreadcrumbItem {
	title: string;
	href: string;
}

export interface NavGroup {
	title: string;
	items: NavItem[];
}

export interface NavItem {
	title: string;
	href: string;
	icon?: LucideIcon | null;
	isActive?: boolean;
	roles?: string[]; // Added roles property
}

export interface SharedData {
	name: string;
	quote: { message: string; author: string };
	auth: Auth;
	ziggy: Config & { location: string };
	sidebarOpen: boolean;
	sharedAbout: AboutProps | null;
	sharedServices: Service[];
	[key: string]: unknown;
}

export interface User {
	id: number;
	name: string;
	email: string;
	avatar?: string;
	role: string; // Added role
	email_verified_at: string | null;
	created_at: string;
	updated_at: string;
	[key: string]: unknown; // This allows for additional properties...
}

export type PageProps<
	T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
	auth: Auth;
};

export interface Category {
	id: number;
	name: string;
}

export interface Client {
	id: number;
	name: string;
	company: string;
	position: string;
}

export interface PaginatedResponse<T> {
	data: T[];
	links: {
		url: string | null;
		label: string;
		active: boolean;
	}[];
}

export interface Service {
	id: number;
	title: string;
	slug: string;
	description: string;
	image: string;
	status: boolean;
	category_id: number;
	post_by: number | null;
	edit_by: number | null;
	created_at: string;
	updated_at: string;
}
