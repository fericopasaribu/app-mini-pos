import { CustomSideBar } from "@/components/CustomSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { CUSTOM_TEXT } from "@/constants/CustomText";
import CustomFooter from "@/layouts/CustomFooter";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: `${CUSTOM_TEXT.app_name} - ${CUSTOM_TEXT.menu_home}`,
  description: "Panel untuk menampilkan data home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <CustomSideBar />
          <section className="area-main">
            <SidebarTrigger />
            {children}
            <CustomFooter />
          </section>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
