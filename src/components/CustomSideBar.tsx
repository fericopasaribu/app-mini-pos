"use client";
import {
  Box,
  ChevronDown,
  CircleSmall,
  LayoutGrid,
  Link as Links,
  Puzzle,
  ShoppingBasket,
} from "lucide-react";
import { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "HOME",
    url: "/",
    icon: LayoutGrid,
  },
  {
    title: "SATUAN",
    url: "/satuan",
    icon: Puzzle,
  },
  {
    title: "BARANG",
    url: "/barang",
    icon: Box,
  },
  {
    title: "PENJUALAN",
    url: "/penjualan",
    icon: ShoppingBasket,
  },
  {
    title: "LINKS",
    icon: Links,
    children: [
      {
        title: "GITHUB",
        url: "/github",
        icon: CircleSmall,
      },
      {
        title: "VERCEL",
        url: "/vercel",
        icon: CircleSmall,
      },
    ],
  },
];

export function CustomSideBar() {
  // const { open, toggleSidebar } = useSidebar();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // if (!mounted) return null;

  return (
    <Sidebar className="!z-3">
      <SidebarContent className="sidebar">
        {/* {open && (
          <div className="area-menu-close">
            <button
              onClick={toggleSidebar}
              className="menu-close"
              aria-label="Tutup Menu">
              <X className="h-5 w-5" />
            </button>
          </div>
        )} */}

        <SidebarGroup>
          <SidebarGroupLabel className="menu-title">
            Main Menu
          </SidebarGroupLabel>
          <SidebarSeparator className="menu-separator" />
          <SidebarGroupContent className="py-2.5">
            <SidebarMenu>
              {items.map((item) => {
                const hasChildren = !!item.children;
                const isChildActive =
                  hasChildren &&
                  item.children?.some((child) => child.url === pathname);

                const isOpen = openSubmenus[item.title] ?? isChildActive;
                const isActive = item.url === pathname || isChildActive;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton className="menu-item" asChild>
                      {hasChildren ? (
                        <button
                          onClick={() => toggleSubmenu(item.title)}
                          className={`!px-3 !py-6 my-1 ${
                            isActive ? "menu-active" : ""
                          }`}>
                          {item.icon && <item.icon className="h-4 w-4" />}
                          <span>{item.title}</span>
                          <ChevronDown
                            className={`h-4 w-4 ml-auto transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      ) : (
                        <Link
                          href={item.url}
                          className={`!px-3 !py-6 my-1 ${
                            isActive ? "menu-active" : ""
                          }`}>
                          {item.icon && <item.icon className="h-4 w-4" />}
                          <span>{item.title}</span>
                        </Link>
                      )}
                    </SidebarMenuButton>

                    {/* Submenu jika ada dan sedang dibuka */}
                    {hasChildren && isOpen && (
                      <ul className="ml-6 mt-1 space-y-1 list-none">
                        {item.children.map((child) => {
                          const isSubActive = pathname === child.url;

                          return (
                            <li key={child.title}>
                              <Link
                                href={child.url}
                                className={`menu-subitem ${
                                  isSubActive ? "menu-active" : ""
                                }`}>
                                {child.icon && (
                                  <child.icon className="h-4 w-4" />
                                )}
                                {child.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
