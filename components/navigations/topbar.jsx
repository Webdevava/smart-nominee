"use client";
import React, { useState, useEffect } from "react";
import { Sun, Bell, Moon, LayoutDashboard, User, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import TransitionLink from "../utils/TransitionLink";
import { Button } from "../ui/button";
import Cookies from 'js-cookie';
import { getProfileDetail } from "@/utils/profile-apis";

const Topbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    profilePicture: ""
  });

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.body.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  // Fetch profile data from cookies or API
  useEffect(() => {
    const fetchProfileData = async () => {
      const profileCookie = Cookies.get('profile');
      if (profileCookie) {
        // Use data from cookies
        const profile = JSON.parse(profileCookie);
        setProfileData({
          firstName: profile.first_name,
          lastName: profile.last_name,
          profilePicture: profile.profile_picture || ""
        });
      } else {
        // Fetch data from API if not in cookies
        try {
          const response = await getProfileDetail();
          const profile = response.data; // Use the response data
          setProfileData({
            firstName: profile.first_name,
            lastName: profile.last_name,
            profilePicture: profile.profile_picture || ""
          });
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };

    fetchProfileData();
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

  // Generate initials for avatar fallback
  const getInitials = () => {
    const first = profileData.firstName ? profileData.firstName.charAt(0) : '';
    const last = profileData.lastName ? profileData.lastName.charAt(0) : '';
    return `${first}${last}`;
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
          className="text-white/75"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Notification"
          className="text-white/75"
        >
          <Bell className="" size={20} />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage 
            src={profileData.profilePicture || ""} 
            alt={`${profileData.firstName} ${profileData.lastName}`} 
          />
          <AvatarFallback>{getInitials()}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Topbar;