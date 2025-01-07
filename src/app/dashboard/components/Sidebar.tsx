"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { RiVideoOnLine } from "react-icons/ri";
import { HiOutlineExternalLink } from "react-icons/hi";

const Sidebar = () => {
  const pathname = usePathname(); // Get the current route

  const isActive = (route: string) => pathname === route;

  return (
    <div className="w-64 bg-[#E4F2F8] text-gray-700 p-4">
      <h2 className="text-2xl text-primaryBg font-semibold mb-10">Accounting</h2>
      <ul className="space-y-6">
        {/* Dashboard Link */}
        <li
          className={`flex items-center justify-between ${
            isActive("/dashboard")
              ? "border-l-4 border-primaryBg bg-[#E4F2F8] text-primaryBg"
              : "hover:text-primaryBg"
          }`}
        >
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 pl-2 text-inherit"
          >
            <IoHomeOutline />
            <span>Dashboard</span>
          </Link>
          <FiChevronRight className="text-gray-500" />
        </li>

        {/* Accounting Link */}
        <li
          className={`flex items-center justify-between ${
            isActive("/dashboard/accounting")
              ? "border-l-4 border-primaryBg bg-[#E4F2F8] text-primaryBg"
              : "hover:text-primaryBg"
          }`}
        >
          <Link
            href="/dashboard/accounting"
            className="flex items-center space-x-2 pl-2 text-inherit"
          >
            <RiVideoOnLine />
            <span>Accounting</span>
          </Link>
          <FiChevronRight className="text-gray-500" />
        </li>

        {/* Reports Link */}
        <li
          className={`flex items-center justify-between ${
            isActive("/dashboard/reports")
              ? "border-l-4 border-primaryBg bg-[#E4F2F8] text-primaryBg"
              : "hover:text-primaryBg"
          }`}
        >
          <Link
            href="/dashboard/reports"
            className="flex items-center space-x-2 pl-2 text-inherit"
          >
            <HiOutlineExternalLink />
            <span>Reports</span>
          </Link>
          <FiChevronRight className="text-gray-500" />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
