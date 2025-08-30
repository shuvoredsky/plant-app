"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./button";
import { Ghost, HomeIcon, Menu, Sprout, X } from "lucide-react";
import ModeToggle from "../ModeToggle";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          {/* Brand */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-primary font-mono tracking-wider"
            >
              Plantventory
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center gap-2 asChild">
              <Link href="/plants">
                <Sprout className="w-4 h-4" />
                <span className="hidden lg:inline">Plants</span>
              </Link>
            </Button>

            <Button variant="ghost" className="flex items-center gap-2 asChild">
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                <span className="hidden lg:inline">Home</span>
              </Link>
            </Button>

            <ModeToggle />
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-accent transition"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-2 mt-2 pb-4">
            <Button
              variant="ghost"
              className="flex items-center gap-2 justify-start asChild"
            >
              <Link href="/plants" onClick={() => setIsOpen(false)}>
                <Sprout className="w-4 h-4" />
                <span>Plants</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="flex items-center gap-2 justify-start asChild"
            >
              <Link href="/" onClick={() => setIsOpen(false)}>
                <HomeIcon className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </Button>

            <div className="pl-2">
              <ModeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
