import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="text-background">
      {/* Newsletter Section */}
      <div className="bg-foreground/85 px-4 md:px-24 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-evenly gap-6 md:gap-0">
          <div className="flex flex-1 gap-3 flex-col">
            <p className="font-semibold text-left">
              Stay updated with Smart Nominee
            </p>
            <p className="opacity-70 text-sm text-left">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
              perspiciatis velit quo corrupti quasi ullam non impedit dicta nobis,
              labore, architecto similiquea.
            </p>
          </div>

          <div className="flex flex-row flex-1 items-center gap-3 md:justify-end">
            <Input
              placeholder="Enter Email"
              className="bg-background/15 border-gray-700 w-full md:max-w-96"
            />
            <Button className="">Subscribe</Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-foreground dark:bg-secondary px-4 md:px-24 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8 md:gap-0 w-full">
          {/* Logo and Description */}
          <div className="flex flex-col flex-1 items-start">
            <Image
              src="logos/logo-dark.svg"
              alt="logo"
              width={100}
              height={50}
              priority
            />
            <p className="mt-4 max-w-xl text-left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem doloremque dolores a doloribus aliquid in
              voluptatem quidem praesentium repellat, maxime aspernatur iure
            </p>
          </div>

          {/* Links Sections */}
          <div className="flex flex-wrap md:flex-nowrap gap-8 md:gap-10 flex-1 justify-end">
            {/* Company Section */}
            <div className="w-[45%] md:w-auto">
              <h3 className="text-lg font-semibold mb-4 text-left">Company</h3>
              <ul className="space-y-2 text-left">
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/features"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Key Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/why-choose-us"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Why choose Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Useful Links Section */}
            <div className="w-[45%] md:w-auto">
              <h3 className="text-lg font-semibold mb-4 text-left">Useful Links</h3>
              <ul className="space-y-2 text-left">
                <li>
                  <Link
                    href="/pricing"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQ's
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contacts Section */}
            <div className="w-full md:w-auto ml-8 lg:ml-0">
              <h3 className="text-lg font-semibold mb-4 text-left">Contacts</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-400 justify-start">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  +91 1245637890
                </li>
                <li className="flex items-center text-gray-400 justify-start">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  support@smartnominee@gmail.com
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-8" />
        <p className="w-full text-center text-sm">
          © 2025 Smartnominee. All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default Footer;