"use client";

import Link from "next/link";

const sidebarItems = [
  { title: "Konto", url: "/account" },
  { title: "Inställningar", url: "/settings" },
  { title: "Logga ut", url: "/log-out" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0 shadow-md">
      <div className="px-4 py-4">
        <h2 className="text-xl font-semibold">Bozpar</h2>
        <ul className="mt-6 space-y-4">
          {sidebarItems.map((item) => (
            <li key={item.title}>
              <Link href={item.url} legacyBehavior>
                <a className="block px-4 py-2 hover:bg-gray-700 transition duration-300">{item.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
