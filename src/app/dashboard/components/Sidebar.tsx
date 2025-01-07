"use client";

import Link from "next/link";

const Sidebar = () => {
  return (
    <div
      className="w-64 bg-[#E4F2F8] text-gray-700 p-4"
      
    >
      <h2 className="text-2xl text-primaryBg font-semibold mb-6">Accounting</h2>
      <ul className="space-y-4">
        <li>
          <Link href="/dashboard" className="hover:text-primaryBg text-[#373232]">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/dashboard/accounting" className="hover:text-primaryBg text-[#373232]">
            Accounting
          </Link>
        </li>
        <li>
          <Link href="/dashboard/reports" className="hover:text-primaryBg text-[#373232]">
            Reports
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
