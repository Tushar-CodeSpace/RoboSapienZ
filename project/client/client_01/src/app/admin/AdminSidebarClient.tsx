
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
    useSidebar,
} from '@/components/ui/sidebar';
import {
    LayoutDashboard,
    Cog,
    Wrench,
    Archive,
    ListChecks,
    Bell,
    Users,
    Settings,
    FileText,
    LogOut,
    ChevronDown,
    ChevronRight,
    Newspaper,
    Tags,
    PlusCircle,
    ClipboardEdit, // Added Icon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
    href?: string;
    label: string;
    icon: React.ElementType;
    children?: NavItem[];
    isAction?: boolean;
    onClick?: () => void;
}

const navItems: NavItem[] = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    {
        label: 'Content',
        icon: Newspaper,
        children: [
            { href: '/admin/posts/new', label: 'Create New Post', icon: PlusCircle },
            { href: '/blog', label: 'Manage Posts', icon: Cog },
            { href: '/admin/suggest-tags', label: 'Suggest Tags', icon: Tags },
            { href: '/admin/summarize-article', label: 'Summarize Article', icon: ClipboardEdit }, // Added new SEO tool
        ]
    },
    {
        label: 'Operations',
        icon: Wrench,
        children: [
            { href: '/admin/operations/machines', label: 'Machines', icon: Cog },
            { href: '/admin/operations/calibration-boxes', label: 'Calibration Boxes', icon: Archive },
            { href: '/admin/operations/calibration-logs', label: 'Calibration Logs', icon: ListChecks },
        ]
    },
    { href: '/admin/alarms', label: 'Alarms', icon: Bell },
    { href: '/admin/users', label: 'User Management', icon: Users },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
    { href: '/admin/reports', label: 'Reports', icon: FileText },

];

const logoutItem: NavItem = { label: 'Logout', icon: LogOut, isAction: true, onClick: () => console.log('Logout clicked') };


export function AdminSidebarClient() {
    const pathname = usePathname();
    const { state: sidebarState, isMobile, openMobile } = useSidebar();
    const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

    const isExpanded = sidebarState === 'expanded' || (isMobile && openMobile);

    // Effect to open submenu if a child is active on initial load or navigation
    useEffect(() => {
        const newOpenSubmenus = { ...openSubmenus };
        let changed = false;
        navItems.forEach(item => {
            if (item.children) {
                const hasActiveChild = item.children.some(child => child.href && pathname.startsWith(child.href));
                if (hasActiveChild && !newOpenSubmenus[item.label]) {
                    newOpenSubmenus[item.label] = true;
                    changed = true;
                }
            }
        });
        if (changed) {
            setOpenSubmenus(newOpenSubmenus);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]); // Only re-run when pathname changes

    const toggleSubmenu = (label: string) => {
        setOpenSubmenus(prev => ({ ...prev, [label]: !prev[label] }));
    };

    const renderNavItem = (item: NavItem, isSubmenuItem = false) => {
        const Icon = item.icon;
        const isSubmenuOpen = openSubmenus[item.label] || false;

        // Is the current item's href an exact match for the current path?
        const isCurrentPage = item.href ? pathname === item.href : false;

        // Is any child of this item active (current page or a prefix of it)?
        const isChildActive = item.children
            ? item.children.some(child => child.href && (pathname === child.href || pathname.startsWith(child.href + '/'))) // More precise for children
            : false;

        // A non-parent item is active if its href is the current page.
        // A parent item is "active" for highlighting if its own href is current, OR if one of its children is active.
        const highlightAsActive = isCurrentPage || (item.children && isChildActive);


        if (item.children) { // This is a parent item with a submenu
            return (
                <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                        onClick={() => toggleSubmenu(item.label)}
                        className={cn(
                            "justify-between",
                            // Highlight style when submenu is open
                            isSubmenuOpen && "bg-sidebar-primary text-sidebar-primary-foreground font-semibold",
                            // Highlight style if "active" (current page or parent of active child) AND submenu is closed
                            !isSubmenuOpen && highlightAsActive && "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                        )}
                        tooltip={isExpanded ? undefined : item.label}
                    >
                        <div className="flex items-center gap-2">
                            <Icon className="h-5 w-5" />
                            <span>{item.label}</span>
                        </div>
                        {isSubmenuOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </SidebarMenuButton>
                    {isSubmenuOpen && (
                        <SidebarMenuSub>
                            {item.children.map(child => renderNavItem(child, true))}
                        </SidebarMenuSub>
                    )}
                </SidebarMenuItem>
            );
        }

        // This is a regular link item (not a parent with children) or an action item
        const ButtonComponent = isSubmenuItem ? SidebarMenuSubButton : SidebarMenuButton;

        // For direct links (not submenu parents), active state is simpler: just isCurrentPage
        // Submenu items use 'accent', top-level direct links use 'primary' when active
        const activeClass = isCurrentPage
            ? (isSubmenuItem ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold" : "bg-sidebar-primary text-sidebar-primary-foreground font-semibold")
            : "";

        const commonProps = {
            className: cn(activeClass),
            tooltip: isExpanded && !isSubmenuItem ? undefined : item.label,
            ...(item.isAction ? { onClick: item.onClick } : {}),
        };

        if (item.href && !item.isAction) {
            return (
                <SidebarMenuItem key={item.label}>
                    <Link href={item.href}>
                        <ButtonComponent {...commonProps}>
                            <Icon className="h-5 w-5" />
                            <span>{item.label}</span>
                        </ButtonComponent>
                    </Link>
                </SidebarMenuItem>
            );
        }

        // For action items like Logout
        return (
            <SidebarMenuItem key={item.label}>
                <ButtonComponent {...commonProps}>
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                </ButtonComponent>
            </SidebarMenuItem>
        );
    };

    return (
        <>
            <SidebarContent className="p-2 space-y-1">
                <SidebarMenu>
                    {navItems.map(item => renderNavItem(item))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-2 border-t border-sidebar-border mt-auto">
                <SidebarMenu>
                    {renderNavItem(logoutItem)}
                </SidebarMenu>
            </SidebarFooter>
        </>
    );
}
