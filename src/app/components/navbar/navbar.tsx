"use client";

import { useState } from "react";
import Link from "next/link";

const menuItems = [
  { title: "Om oss", url: "/about" },
  { title: "Tjänster", url: "/our-services" },
  { title: "Kontakt", url: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a className="text-3xl font-semibold text-white">Bozpar</a>
        </Link>

        <button onClick={toggleMenu} className="lg:hidden text-white focus:outline-none" aria-label="Toggle menu">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        <div className={`lg:flex lg:items-center lg:space-x-8 ${isOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col lg:flex-row lg:space-x-8">
            {menuItems.map((menuItem) => (
              <li key={menuItem.title}>
                <Link href={menuItem.url} legacyBehavior>
                  <a className="block px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-md transition duration-300">{menuItem.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
