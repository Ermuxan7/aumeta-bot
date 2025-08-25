"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const tabs = [
  { name: "Dashboard", href: "/" },
  { name: "Posts", href: "/posts" },
  { name: "Profile", href: "/profile" },
];

const TabBar = () => {
  const pathName = usePathname();
  return (
    <nav className="fixed top-0 left-0 z-10 flex items-center justify-center gap-3 bg-gray-800 w-full py-4">
      {tabs.map((tab, index) => (
        <div key={index}>
          <Link
            href={tab.href}
            className={`relative px-3 py-1 text-lg ${
              pathName === tab.href
                ? "text-blue-400 after:absolute after:left-3  after:bottom-0 after:h-[2px] after:w-2/4 after:bg-blue-400"
                : "text-white "
            } transition-all duration-200`}
          >
            {tab.name}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default TabBar;
