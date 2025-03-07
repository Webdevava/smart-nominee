import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LoginDialog from '../auth/login-dialog';
import SignUpDialog from '../auth/signup-dialog';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About us" },
    { href: "#features", label: "Key Features" },
    { href: "#whyUs", label: "Why Choose Us" },
    { href: "#pricing", label: "Pricing" },
    { href: "#FAQ", label: "FAQ's" },
    { href: "#blogs", label: "Blogs" },
  ];

  return (
    <nav className="bg-blue-600 shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-24">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              <img src="/logos/logo.svg" alt="Logo" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-100 font-semibold hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center space-x-8">
            <LoginDialog/>
           <SignUpDialog/>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-blue-600 transition-all duration-300 ease-in-out">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-white hover:text-gray-400"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="space-y-2 mt-4 px-3">
            <LoginDialog/>
            <SignUpDialog/>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-blue-600 to-blue-200 flex-1">
      <div className="mx-auto px-4 sm:px-6 lg:px-24">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between pt-12 lg:pt-24 pb-12 lg:pb-24 lg:pb-0">
          {/* Text Content */}
          <div className="space-y-6 text-center lg:text-left text-white mt-8 lg:mt-0">
            <h1 className="text-3xl lg:text-6xl font-bold leading-tight">
              <span className="block">Your Life. Your Legacy.</span>
              <span className="block text-black">Protected & Shared</span>
              <span className="block">Only When It Matters.</span>
            </h1>
            <p className="text-base lg:text-xl max-w-xl mx-auto lg:mx-0">
              Your hard-earned assets, your hidden investments, and your responsibilities should never be lost or forgotten. Store them securely and ensure they reach your loved ones—at the right time, in the right way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="px-8 py-4 rounded-lg text-lg font-semibold bg-white text-blue-600 hover:bg-gray-200">
                Get Started Today
              </Button>
              <Button className="px-8 py-4 rounded-lg text-lg font-semibold text-white hover:bg-white hover:text-blue-600">
                Explore Features
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-auto">
            <img
              src="/images/hero.png"
              alt="Person showing mobile app"
              className="w-full max-w-2xl lg:max-w-none rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default function Home() {
  return (
    <div className=" flex flex-col" id="home">
      <Navbar />
      <Hero />
    </div>
  );
}