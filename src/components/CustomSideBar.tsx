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
import { CUSTOM_TEXT } from "@/constants/CustomText";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: `${CUSTOM_TEXT.menu_home.toUpperCase()}`,
    url: "/",
    icon: LayoutGrid,
  },
  {
    title: `${CUSTOM_TEXT.menu_satuan.toUpperCase()}`,
    url: `/${CUSTOM_TEXT.menu_satuan.toLowerCase()}`,
    icon: Puzzle,
  },
  {
    title: `${CUSTOM_TEXT.menu_barang.toUpperCase()}`,
    url: `/${CUSTOM_TEXT.menu_barang.toLowerCase()}`,
    icon: Box,
  },
  {
    title: `${CUSTOM_TEXT.menu_penjualan.toUpperCase()}`,
    url: `/${CUSTOM_TEXT.menu_penjualan.toLowerCase()}`,
    icon: ShoppingBasket,
  },
  {
    title: `${CUSTOM_TEXT.menu_links.toUpperCase()}`,
    icon: Links,
    children: [
      {
        title: `${CUSTOM_TEXT.menu_github.toUpperCase()}`,
        url: `/${CUSTOM_TEXT.menu_github.toLowerCase()}`,
        icon: CircleSmall,
      },
      {
        title: `${CUSTOM_TEXT.menu_vercel.toUpperCase()}`,
        url: `/${CUSTOM_TEXT.menu_vercel.toLowerCase()}`,
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
                  item.children?.some((child) =>
                    pathname.startsWith(child.url)
                  );

                const isOpen = openSubmenus[item.title] ?? isChildActive;

                const isActive =
                  (item.url &&
                    (pathname === item.url ||
                      pathname.startsWith(item.url + "/"))) ||
                  isChildActive;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton className="menu-item" asChild>
                      {/* menu */}
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

                    {/* submenu */}
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
