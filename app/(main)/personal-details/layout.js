import Sidebar from "@/components/navigations/sidebar";
import React from "react";

export default function MainLayout({ children }) {
  return (
    <main className="flex flex-1">

      <div className="p-3 pr-0 h-[calc(100vh-0rem)] lg:h-[calc(100vh-4rem)] hidden lg:block">
          <Sidebar />
        </div>
        <div
          id="page-container"
          className="p-0 lg:p-3  w-full overflow-auto h-[calc(100vh)] lg:h-[calc(100vh-4rem)]"
        >
          {children}
        </div>
      
    </main>
  );
}
