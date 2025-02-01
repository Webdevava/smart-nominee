  "use client";
  import React, { useState, useEffect } from "react";
  import { Sun, Bell, Moon, LayoutDashboard, User, Settings } from "lucide-react";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import Image from "next/image";
  import Link from "next/link";
  import { usePathname, useRouter } from "next/navigation";
  import TransitionLink from "../utils/TransitionLink";

  const Topbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
      const theme = localStorage.getItem("theme");
      if (theme === "dark") {
        document.body.classList.add("dark");
        setIsDarkMode(true);
      }
    }, []);

    const toggleTheme = () => {
      if (isDarkMode) {
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
      } else {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
      }
      setIsDarkMode(!isDarkMode);
    };

    const navItems = [
      {
        name: "Dashboard",
        icon: <LayoutDashboard size={20} />,
        route: "/dashboard",
      },
      {
        name: "Personal Details",
        icon: <User size={20} />,
        route: "/personal-details",
      },
      { name: "Settings", icon: <Settings size={20} />, route: "/settings" },
    ];

    return (
      <header className="bg-foreground flex items-center justify-between p-4 text-background h-16 shadow-md md:rounded-none rounded-full">
        {/* Logo - Hidden on mobile */}
        <div
          className="hidden md:block cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src="logos/logo-dark.svg"
            alt="logo"
            width={80}
            height={50}
            priority
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 md:flex-none">
          <ul className="flex justify-center md:justify-start gap-6 items-center text-sm font-medium">
            {navItems.map((item) => {
              const isActive = pathname === item.route;
              return (
                <li key={item.name}>
                  <TransitionLink
                    href={item.route}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                      isActive
                        ? "text-primary bg-card font-bold shadow-sm"
                        : "hover:text-blue-300"
                    }`}
                  >
                    {item.icon}
                    {/* Show label only if active on mobile, always show on desktop */}
                    <span className={`${isActive ? "block" : "hidden"} md:block`}>
                      {item.name}
                    </span>
                  </TransitionLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex gap-4 items-center">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full hover:bg-[#1C2E59] transition-colors hidden md:block"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Bell className="cursor-pointer hidden md:block" size={20} />
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>
    );
  };

  export default Topbar;
