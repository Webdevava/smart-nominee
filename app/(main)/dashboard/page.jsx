// app/page.js or any other page component
"use client";

import DashboardPage from "./dashboard";
import NotificationsPanel from "./notification-panel";

export default function Dashboard() {
  return (
    <main className="p-4 flex h-full">
<DashboardPage/>
        <NotificationsPanel className="border-gray-300 h-full" />
    </main>
  );
}