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
    <nav className="bg-muted w-vw h-10 md:h-14 mx-6 my-4 flex items-center justify-between rounded-full p-0.5">
      {tabs.map((tab, idx) => (
        <Link
          key={idx}
          href={tab.href}
          className={`flex items-center justify-center font-semibold text-xs md:text-lg w-full h-full ${
            pathName === tab.href && "bg-primary rounded-full"
          } transition-all duration-300 ease-in-out`}
        >
          {tab.name}
        </Link>
      ))}
    </nav>
  );
};

export default TabBar;
