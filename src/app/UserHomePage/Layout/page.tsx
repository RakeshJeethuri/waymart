// filepath: c:\Users\test account\Desktop\waymart\src\components\Layout\Layout.tsx
"use client";

import React from 'react';
import Nav from '../Navbar/page'; // Adjust the path to your Navbar component
import './style.css'; // Optional: Add layout-specific styles

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Nav />
            <main className="layout-content">{children}</main>
        </>
    );
};

export default Layout;