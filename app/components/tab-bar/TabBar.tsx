"use client";
import { useT } from "@/hooks/useT";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "Jańa daǵaza", href: "/" },
  { name: "Daǵazalarım ", href: "/my-posts" },
  { name: "Profil", href: "/profile" }
];

const getTabBarTitles = (t: any) => {
  const titles = t.raw("tab_bar_titles") || [];
  return [
    { name: titles[0] || "New Post", href: "/" },
    { name: titles[1] || "My Posts", href: "/my-posts" },
    { name: titles[2] || "Profile", href: "/profile" }
  ];
};

const TabBar = () => {
  const pathName = usePathname();
  const t = useT();
  return (
    <nav className="bg-muted w-vw h-12 md:h-14 mx-6 my-4 flex items-center justify-between rounded-full p-0.5">
      {getTabBarTitles(t).map((tab, idx) => (
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
