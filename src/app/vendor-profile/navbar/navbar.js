"use client";
import { useState } from 'react';
import Navigation from '../navigation/navigation';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';


export default function Navbar() {
const [selectedPage, setSelectedPage] = useState('dashboard');
const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar
const router = useRouter();

const handleSidebarClose = (e) => {
  if (e.target.classList.contains('sidebar-overlay')) {
    setIsSidebarOpen(false);
  }
};
    return (
      
        <div className="dashboard  flex flex-col "> {/* Changed h-full to h-screen */}
          <div className="flex justify-between bg-[linear-gradient(135deg,#A80038,#FD0054)] px-5 py-2">
            <FaUserCircle className="text-[#2B2024] text-3xl cursor-pointer" />
            <div className="text-[#2B2024] text-4xl font-bold cursor-pointer" onClick={()=>router.push("/")} >WayMart</div>
            <FaBars className="text-[#2B2024] text-2xl cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          </div>
          {isSidebarOpen && (
            <div className="fixed inset-0 sidebar-overlay z-10" onClick={handleSidebarClose}>
              <div className="fixed top-0 right-0 h-screen w-64 bg-[linear-gradient(135deg,#FD0054,#A80038)] shadow-lg p-4 text-[#FBF9FA] z-20">
                <button onClick={() => setIsSidebarOpen(false)} className="text-gray-700 text-2xl">×</button>
                <Navigation selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
              </div>
            </div>
          )}
        </div>);
}