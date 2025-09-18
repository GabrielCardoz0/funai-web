//import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
// import Sidebar from "@/components/sidebar";
"use client";
import SidebarNav from "@/components/sidebar";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { UserProvider } from "@/contexts/userContext";

export const publicRoutes = [
  "/",
  "/forgot-password",
  "/login",
  "/reset-password",
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();
  const isLoginPage = publicRoutes.includes(pathname);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Toaster position="top-center"/>
        <UserProvider>
          <SidebarProvider>
            {!isLoginPage && <SidebarNav/>}
            <main className="w-full">
              {/* !isLoginPage && <SidebarTrigger/> */}
              {children}
            </main>
          </SidebarProvider>
        </UserProvider>
      </body>
    </html>
  )
}
