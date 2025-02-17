import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
          <div className="hidden md:flex items-center space-x-8 text-sm">
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
          <div className="hidden md:flex items-center space-x-8">
            <Button className="px-4 py-2 rounded-lg bg-blue-500 w-24">
              Login
            </Button>
            <Button className="px-4 py-2 rounded-lg bg-white text-primary w-24">
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
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
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-gray-600 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="space-y-2 mt-4 px-3">
              <Button className="w-full bg-blue-500 text-white">
                Login
              </Button>
              <Button className="w-full bg-white text-primary border border-blue-600">
                Sign Up
              </Button>
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
        <div className="flex flex-col-reverse md:flex-row items-center justify-between pt-12 md:pt-24 pb-12 md:pb-24 lg:pb-0">
          {/* Text Content */}
          <div className="space-y-6 text-center md:text-left text-white mt-8 md:mt-0">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight">
              <span className="block">Secure Your</span>
              <span className="block text-black">Financial Future,</span>
              <span className="block">Hassle-Free</span>
            </h1>
            <p className="text-base md:text-xl max-w-xl mx-auto md:mx-0">
              Easily manage and track your bank accounts, investments, and
              insurance policies while ensuring your loved ones have access
              when they need it the most.
            </p>
            <Button className="px-8 py-6 rounded-lg text-lg font-semibold">
              Get Started
            </Button>
          </div>

          {/* Image */}
          <div className="w-full md:w-auto">
            <img
              src="/images/hero.png"
              alt="Person showing mobile app"
              className="w-full max-w-2xl md:max-w-none md:w-[52rem] rounded-lg"
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