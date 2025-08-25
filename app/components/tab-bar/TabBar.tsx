"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const tabs = [
  { name: "Dashboard", href: "/" },
  { name: "My posts", href: "/my-posts" },
  { name: "Profile", href: "/profile" },
];

const TabBar = () => {
  const pathName = usePathname();
  return (
    <nav className="fixed top-0 left-0 z-10 flex items-center justify-around gap-3 border-b border-gray-300 w-full py-4 px-10 md:px-20 lg:px-40 xl:px-60 bg-gray-100 shadow-lg">
      {tabs.map((tab, index) => (
        <div key={index}>
          <Link
            href={tab.href}
            className={`relative px-3 py-1 font-medium text-lg md:text-xl  ${
              pathName === tab.href
                ? "text-blue-400 after:absolute after:left-3 after:bottom-0 after:h-[2px] after:w-2/4 after:bg-blue-400"
                : "text-foreground hover:underline"
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
