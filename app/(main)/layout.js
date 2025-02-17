import Sidebar from "@/components/navigations/sidebar";
import Topbar from "@/components/navigations/topbar";
import React from "react";

export default function MainLayout({ children }) {
  return (
    <main className="flex flex-col h-screen relative w-full">
      {/* Topbar - hidden on small screens */}
      <div className="hidden lg:block">
        <Topbar />
      </div>

      <div className="flex flex-1 w-full">
      {children}
      </div>
    </main>
  );
}
