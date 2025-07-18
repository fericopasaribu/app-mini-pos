"use client";
import {
  Box,
  ChevronDown,
  CircleSmall,
  LayoutGrid,
  Link,
  Puzzle,
  ShoppingBasket
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
  SidebarSeparator
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "HOME",
    url: "#",
    icon: LayoutGrid,
  },
  {
    title: "SATUAN",
    url: "#",
    icon: Puzzle,
  },
  {
    title: "BARANG",
    url: "#",
    icon: Box,
  },
  {
    title: "PENJUALAN",
    url: "#",
    icon: ShoppingBasket,
  },
  {
    title: "LINKS",
    icon: Link,
    children: [
      {
        title: "GITHUB",
        url: "#",
        icon: CircleSmall,
      },
      {
        title: "VERCEL",
        url: "#",
        icon: CircleSmall,
      },
    ],
  },
];

export function CustomSideBar() {
  // const { open, toggleSidebar } = useSidebar();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

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
