import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { url } = usePage();

    // Function to normalize paths (remove trailing slash, except for root)
    const normalizePath = (path: string) => {
        const urlObj = new URL(path, 'http://dummy.com'); // Use a dummy base URL to parse relative paths
        let normalized = urlObj.pathname;
        if (normalized.length > 1 && normalized.endsWith('/')) {
            normalized = normalized.slice(0, -1);
        }
        return normalized;
    };

    const currentPath = normalizePath(url);

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const itemPath = normalizePath(item.href);
                    // Determine if the current item is active
                    // It's active if the current path exactly matches the item's path, or if the current path starts with the item's path and the item's path is not just '/'
                    const isActive = currentPath === itemPath || (currentPath.startsWith(itemPath) && itemPath !== '/');

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={isActive} tooltip={{ children: item.title }}>
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}