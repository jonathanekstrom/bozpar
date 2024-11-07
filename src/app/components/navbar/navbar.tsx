"use client";

import { useState } from "react";
import Link from "next/link";

const menuItems = [
  {
    title: "Om oss",
    url: "/about",
  },
  {
    title: "Tjänster",
    url: "/our-services",
  },
  {
    title: "Kontakt",
    url: "/contact",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-semibold">Bozpar</a>
        </Link>

        <button onClick={toggleMenu} className="lg:hidden text-white focus:outline-none" aria-label="Toggle menu">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        <div className={`lg:flex lg:items-center lg:space-x-6 ${isOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 relative">
            {menuItems.map((menuItem) => (
              <li key={menuItem.title} className="relative group">
                <Link href={menuItem.url} legacyBehavior>
                  <a className="block px-4 py-2 text-gray-300 hover:bg-gray-700 transition duration-300">{menuItem.title}</a>
                </Link>

                <div
                  className="absolute left-0 mt-2 w-48 bg-gray-800 text-white shadow-lg rounded-lg hidden group-hover:block"
                  onMouseEnter={toggleDropdown}
                  onMouseLeave={toggleDropdown}
                >
                  {dropdownOpen && (
                    <ul className="py-2">
                      {menuItems.map((item) => (
                        <li key={item.title}>
                          <Link href={item.url} legacyBehavior>
                            <a className="block px-4 py-2 hover:bg-gray-700 transition duration-300">{item.title}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
