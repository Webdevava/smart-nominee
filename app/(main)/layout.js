import Sidebar from "@/components/navigations/sidebar";
import Topbar from "@/components/navigations/topbar";
import React from "react";

export default function MainLayout({ children }) {
  return (
    <main className="flex flex-col h-screen relative">
      {/* Topbar - hidden on small screens */}
      <div className="hidden md:block">
        <Topbar />
      </div>

      <div className="flex flex-1">
        <div className="p-3 pr-0 h-[calc(100vh-0rem)] md:h-[calc(100vh-4rem)] hidden md:block">
          <Sidebar />
        </div>
        <div
          id="page-container"
          className="p-3 w-full overflow-auto h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)]"
        >
          {children}
        </div>
      </div>

      {/* Bottom fixed topbar - visible only on small screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
        <Topbar />
      </div>
    </main>
  );
}
