"use client";

import { useState } from "react";
import Link from "next/link";

const sidebarItems = [
  { title: "Om oss", url: "/about" },
  { title: "Tjänster", url: "/services" },
  { title: "Kontakt", url: "/contact" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Sidebar background overlay */}
      <div className={`${isOpen ? "block" : "hidden"} fixed inset-0 bg-black bg-opacity-50 z-40`} onClick={toggleSidebar}></div>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 w-64 h-full bg-gray-900 text-white shadow-lg transform transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="px-6 py-8">
          <h2 className="text-2xl font-semibold mb-6">Bozpar</h2>
          <ul className="space-y-6">
            {sidebarItems.map((item) => (
              <li key={item.title}>
                <Link href={item.url} legacyBehavior>
                  <a className="block px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-md transition duration-300">{item.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Toggle button for mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed top-6 left-6 p-4 text-white bg-gray-800 rounded-full focus:outline-none z-50 md:hidden"
        aria-label="Toggle sidebar"
      >
        ☰
      </button>
    </>
  );
}
