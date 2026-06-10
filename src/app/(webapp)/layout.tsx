import type { Metadata } from "next";
import { Navbar } from "@/app/(webapp)/app/layout/header/Navbar";
import { Sidebar } from "@/app/(webapp)/app/layout/sidebar/Sidebar";
import "nprogress/nprogress.css";
import NavigationLoaderWrapper from "@/app/(webapp)/app/layout/ux/NavigationLoaderWrapper";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "VTC ADMIN",
  description: "Gestion des flottes",
};

export default function WebAppGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <NavigationLoaderWrapper />
      <div
        className={
          "px-8 lg:ml-[230px] pt-[110px] pb-[84px] lg:pb-4 bg-[#f5f5f574]"
        }>
        <main>{children}</main>
      </div>
    </div>
  );
}
