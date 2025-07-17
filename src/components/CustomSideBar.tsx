"use client";
import {
  Box,
  ChevronDown,
  CircleSmall,
  LayoutGrid,
  Link,
  Puzzle,
  ShoppingBasket,
  X,
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
  useSidebar,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: LayoutGrid,
  },
  {
    title: "Satuan",
    url: "#",
    icon: Puzzle,
  },
  {
    title: "Barang",
    url: "#",
    icon: Box,
  },
  {
    title: "Penjualan",
    url: "#",
    icon: ShoppingBasket,
  },
  {
    title: "Links",
    icon: Link,
    children: [
      {
        title: "Github",
        url: "#",
        icon: CircleSmall,
      },
      {
        title: "Vercel",
        url: "#",
        icon: CircleSmall,
      },
    ],
  },
];

export function CustomSideBar() {
  const { open, toggleSidebar } = useSidebar();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <Sidebar >
      <SidebarContent className="sidebar">
        {open && (
          <div className="flex justify-end p-2 w-full sm:hidden">
            <button
              onClick={toggleSidebar}
              className="menu-close"
              aria-label="Tutup Menu">
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="menu-title">
            Main Menu
          </SidebarGroupLabel>
          <SidebarSeparator className="menu-separator" />
          <SidebarGroupContent className="py-2.5">
            <SidebarMenu>
              {items.map((item) => {
                const hasChildren = !!item.children;
                const isOpen = openSubmenus[item.title];

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton className="menu-item" asChild>
                      <button
                        onClick={() =>
                          hasChildren ? toggleSubmenu(item.title) : undefined
                        }
                        className="flex items-center gap-2 w-full text-left">
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{item.title}</span>
                        {hasChildren && (
                          <ChevronDown
                            className={`h-4 w-4 ml-auto transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </button>
                    </SidebarMenuButton>

                    {/* Submenu jika ada dan sedang dibuka */}
                    {hasChildren && isOpen && (
                      <ul className="ml-6 mt-1 space-y-1 list-none">
                        {item.children.map((child) => (
                          <li key={child.title}>
                            <a href={child.url} className="menu-subitem">
                              {child.icon && <child.icon className="h-4 w-4" />}
                              {child.title}
                            </a>
                          </li>
                        ))}
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
