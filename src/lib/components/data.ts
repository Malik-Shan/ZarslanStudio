 import type { RouteId } from "$app/types"
 import type { Component } from "svelte"

import CameraIcon from "@lucide/svelte/icons/camera";
import ChartBarIcon from "@lucide/svelte/icons/chart-bar";
import LayoutDashboardIcon from "@lucide/svelte/icons/layout-dashboard";
import DatabaseIcon from "@lucide/svelte/icons/database";
import FileSparklesIcon from "@lucide/svelte/icons/square-sparkles";
import FileTextIcon from "@lucide/svelte/icons/file-text";
import FileTypeIcon from "@lucide/svelte/icons/file-type";
import FolderIcon from "@lucide/svelte/icons/folder";
import CircleHelpIcon from "@lucide/svelte/icons/circle-help";
import ListIcon from "@lucide/svelte/icons/list";
import FileChartColumnIcon from "@lucide/svelte/icons/file-chart-column";
import SearchIcon from "@lucide/svelte/icons/search";
import SettingsIcon from "@lucide/svelte/icons/settings";
import UsersIcon from "@lucide/svelte/icons/users";

type Data = {
    user: {
        name: string,
        email: string
        avatar: string
    },
    navMain: Array<{
        title: string,
        url: RouteId,
        icon: Component
    }>,
    navClouds: Array<{
        title: string,
        icon: Component,
        url: RouteId,
        isActive?: boolean,
        items: Array<{
            title: string,
            url: RouteId
        }>
    }>,
    navSecondary: Array<{
        title: string,
        url: RouteId
        icon: Component,
    }>,
    documents: Array<{
        name: string,
        url: RouteId
        icon: Component,
    }>
}

export const data:Data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/",
            icon: LayoutDashboardIcon,
        },
        {
            title: "Lifecycle",
            url: "/",
            icon: ListIcon,
        },
        {
            title: "Analytics",
            url: "/",
            icon: ChartBarIcon,
        },
        {
            title: "Projects",
            url: "/",
            icon: FolderIcon,
        },
        {
            title: "Team",
            url: "/",
            icon: UsersIcon,
        },
    ],
    navClouds: [
        {
            title: "Capture",
            icon: CameraIcon,
            isActive: true,
            url: "/",
            items: [
                {
                    title: "Active Proposals",
                    url: "/",
                },
                {
                    title: "Archived",
                    url: "/",
                },
            ],
        },
        {
            title: "Proposal",
            icon: FileTextIcon,
            url: "/",
            items: [
                {
                    title: "Active Proposals",
                    url: "/",
                },
                {
                    title: "Archived",
                    url: "/",
                },
            ],
        },
        {
            title: "Prompts",
            icon: FileSparklesIcon,
            url: "/",
            items: [
                {
                    title: "Active Proposals",
                    url: "/",
                },
                {
                    title: "Archived",
                    url: "/",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "/(app)/user/setting",
            icon: SettingsIcon,
        },
        {
            title: "Get Help",
            url: "/",
            icon: CircleHelpIcon,
        },
        {
            title: "Search",
            url: "/",
            icon: SearchIcon,
        },
    ],
    documents: [
        {
            name: "Data Library",
            url: "/",
            icon: DatabaseIcon,
        },
        {
            name: "Reports",
            url: "/",
            icon: FileChartColumnIcon,
        },
        {
            name: "Word Assistant",
            url: "/",
            icon: FileTypeIcon,
        },
    ],
};
