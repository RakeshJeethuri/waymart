"use client"
import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const Nav = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(searchQuery); // Pass the search query to the parent component
    }
  };

  return (
    <div className="nav">
      <Link href="/UserHomePage/Home">
        <img src="/images/whitelogo.png" alt="Logo" />
      </Link>
      <div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          onKeyDown={handleKeyPress} // Listen for the Enter key
        />
      </div>
      <div className="links">
        <Link href={"/UserHomePage/Orders"} className="orders">
          Orders
        </Link>
        <Link href="/UserHomePage/Settings" className="settings">
          Settings
        </Link>
        <Link href="/UserHomePage/Cart" className="cart">
          <FontAwesomeIcon icon={faCartShopping} />
        </Link>
      </div>
    </div>
  );
};

export default Nav;