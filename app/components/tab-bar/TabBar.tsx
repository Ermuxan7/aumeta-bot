"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const tabs = [
  { name: "Jańa daǵaza", href: "/" },
  { name: "Daǵazalarım ", href: "/my-posts" },
  { name: "Profil", href: "/profile" },
];

const TabBar = () => {
  const pathName = usePathname();
  return (
    <nav className="fixed top-0 left-0 z-10 bg-background flex items-center justify-around gap-3 w-full py-4 px-6 md:px-20 lg:px-40 xl:px-60">
      {tabs.map((tab, index) => (
        <div key={index}>
          <Link
            href={tab.href}
            className={`relative py-1 font-medium text-md md:text-xl  ${
              pathName === tab.href
                ? "text-blue-400 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-400"
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
