"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Vending Machine App
        </Link>
        <ul className="hidden md:flex">
          <li className="inline-block mr-4">
            <Link href="/">Home</Link>
          </li>
          <li className="inline-block mr-4">
            <Link href="/history">History</Link>
          </li>
          <li className="inline-block mr-4">
            <Link href="/admin">Dashboard</Link>
          </li>
        </ul>
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center"
          >
            {!menuOpen ? (
              <Menu className="w-6 h-6" />
            ) : (
              <X className="w-6 h-6" />
            )}
          </button>
          {menuOpen && (
            <div className="top-0 left-0 min-h-screen bg-gray-700 text-white w-full z-50 fixed">
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-5 right-4"
              >
                <X className="w-6 h-6" />
              </button>
              <ul className="flex flex-col justify-center items-center min-h-screen space-y-6 text-2xl">
                <li>
                  <Link href="/" onClick={closeMenu}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/history" onClick={closeMenu}>
                    History
                  </Link>
                </li>
                <li>
                  <Link href="/admin" onClick={closeMenu}>
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
