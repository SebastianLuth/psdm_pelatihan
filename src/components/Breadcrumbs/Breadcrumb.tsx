"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ChevronRight } from "lucide-react";

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Title Page */}
      <div></div>
      {/* Breadcrumb Navigation */}
      <nav>
        <ol className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-sm sm:text-base bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md">
          {/* Home Link */}
          <li>
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-gray-700 hover:text-blue-600 transition-all"
            >
              <Home className="h-5 w-5 text-blue-500" />
              Dashboard
            </Link>
          </li>

          {/* Dynamic Breadcrumb Links */}
          {pathnames.map((path, index) => {
            const href = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            return (
              <li key={index} className="flex items-center gap-3">
                <ChevronRight className="h-5 w-5 text-gray-400" />
                {!isLast ? (
                  <Link
                    href={href}
                    className="font-semibold text-gray-700 hover:text-blue-600 transition-all capitalize"
                  >
                    {decodeURIComponent(path)}
                  </Link>
                ) : (
                  <span className="font-semibold text-white px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md capitalize">
                    {decodeURIComponent(path)}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
