  "use client";
  import React, { useState, useEffect } from "react";
  import { Sun, Bell, Moon, LayoutDashboard, User, Settings } from "lucide-react";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import Image from "next/image";
  import Link from "next/link";
  import { usePathname, useRouter } from "next/navigation";
  import TransitionLink from "../utils/TransitionLink";
import { Button } from "../ui/button";

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
      <header className="bg-foreground dark:bg-secondary flex items-center justify-between p-4 text-background h-16 shadow-md md:rounded-none rounded-full">
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
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "text-primary bg-card font-bold shadow-sm"
                        : "hover:text-blue-300 text-white/75"
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
          <Button
          size="icon"
          variant="ghost"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className=" text-white/75"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          <Button
          size="icon"
          variant="ghost"
            aria-label="Notification"
            className=" text-white/75"
          >
          <Bell className="" size={20} />
          </Button>

          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>
    );
  };

  export default Topbar;
