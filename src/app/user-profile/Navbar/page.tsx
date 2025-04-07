// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

// interface NavProps {
//   onSearch: (query: string) => void;
// }

// const Nav: React.FC<NavProps> = ({ onSearch }) => {
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === "Enter") {
//       onSearch(searchQuery);
//     }
//   };

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-[#A80038] shadow-md z-50">
//       <div className=" px-4 py-3 flex md:flex-row  items-center justify-between gap-3">
//         {/* Logo */}
//         <Link href="/UserHomePage/Home">
//           <img
//             src="/images/whitelogo.png"
//             alt="Logo"
//             className="w-40 h-auto cursor-pointer"
//           />
//         </Link>

//         {/* Search */}
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           onKeyDown={handleKeyPress}
//           className="w-full md:w-64 px-4 py-2 rounded-md text-sm focus:outline-none shadow-md bg-white"
//         />

//         {/* Navigation Links */}
//         <div className="flex items-center gap-6 text-white text-lg font-semibold mt-2 md:mt-0">
//           <Link href="/UserHomePage/Orders" className="hover:text-pink-200">
//             Orders
//           </Link>
//           <Link href="/UserHomePage/Settings" className="hover:text-pink-200">
//             Settings
//           </Link>
//           <Link href="/UserHomePage/Cart" className="hover:text-pink-200">
//             <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Nav;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { HiMenu, HiX } from "react-icons/hi";

interface NavProps {
  onSearch: (query: string) => void;
}

const Nav: React.FC<NavProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(searchQuery);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-[#A80038] shadow-md z-50">
        <div className="px-4 py-3 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/user-profile">
            <img
              src="/images/whitelogo.png"
              alt="Logo"
              className="w-40 h-auto cursor-pointer"
            />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 flex justify-center">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              className="md:w-96 px-4 py-2 rounded-md text-sm focus:outline-none shadow-md bg-white"
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-white text-lg font-semibold">
            <Link href="/user-profile/Orders" className="hover:text-pink-200">
              Orders
            </Link>
            <Link href="/user-profile/Settings" className="hover:text-pink-200">
              Settings
            </Link>
            <Link href="/user-profile/Cart" className="hover:text-pink-200">
              <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <HiMenu />
          </button>
        </div>
      </nav>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#A80038] text-white shadow-lg transform transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b border-white">
          <span className="text-xl font-bold">Menu</span>
          <button
            className="text-white text-2xl"
            onClick={() => setSidebarOpen(false)}
          >
            <HiX />
          </button>
        </div>
        <div className="flex flex-col gap-6 p-4 text-lg font-semibold">
          <Link
            href="/user-profile/Orders"
            className="hover:text-pink-200"
            onClick={() => setSidebarOpen(false)}
          >
            Orders
          </Link>
          <Link
            href="/user-profile/Settings"
            className="hover:text-pink-200"
            onClick={() => setSidebarOpen(false)}
          >
            Settings
          </Link>
          <Link
            href="/user-profile/Cart"
            className="hover:text-pink-200"
            onClick={() => setSidebarOpen(false)}
          >
            <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Nav;