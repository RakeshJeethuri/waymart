'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState, useEffect } from 'react';
// Dynamically import MapContainer and related components
const DynamicMap = dynamic(() => import('./components/Map'), { ssr: false });

export default function Home() {

  const servicePoints = [
    { name: "Mumbai Service Point", position: [19.076, 72.8777] },
    { name: "Delhi Service Point", position: [28.7041, 77.1025] },
    { name: "Bangalore Service Point", position: [12.9716, 77.5946] },
    { name: "Hyderabad Service Point", position: [17.385, 78.4867] },
    { name: "Kurnool Service Point", position: [15.8281, 78.0373] },
    { name: "Visakhapatnam Service Point", position: [17.6868, 83.2185] }
];


  const facts = [
    "Apples are made of 25% air, which is why they float in water!",
    "Carrots were originally purple before the orange variety was developed.",
    "Bananas are berries, but strawberries are not!",
    "Spinach is packed with iron, making it a great energy booster.",
    "A single mature oak tree can drop up to 10,000 acorns in a year!",
    "Tomatoes and avocados are technically fruits, not vegetables!"
  ];

  const [factIndex, setFactIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((prevIndex) => (prevIndex + 1) % facts.length);
    }, 4000); // Change fact every 4 seconds

    return () => clearInterval(interval);
  }, []);


  return (
   <>
  


    <div className="bg-[#FBF9FA] text-[#2B2024] font-sans">
      {/* Header */} 
      {/* <header className="bg-white shadow-md fixed top-0 w-full z-100000">
        <nav className="container mx-auto flex justify-between items-center p-4">
          <div className="text-2xl font-bold text-[#A80038]"><img src='/images/logo-bg-removed.png' width={150} height={50}></img></div>
          <div className="space-x-4">
            <a href="#" className="hover:text-[#FD0054]">Home</a>
            <a href="#" className="hover:text-[#FD0054]">About</a>
            <a href="#" className="hover:text-[#FD0054]">Products</a>
            <a href="/login-homepage" className="hover:text-[#FD0054]">Login</a>
            <a href="#" className="bg-[#FD0054] text-white px-4 py-2 rounded">CONTACT</a>
          </div>
        </nav>
      </header> */}
      <header className="bg-white  shadow-md fixed top-0 w-full z-50">
  <nav className="container mx-auto flex justify-between items-center p-4">
    <div className="text-2xl font-bold text-[#A80038]">
      <img src='/images/logo-bg-removed.png' width={150} height={50} alt="WayMart Logo"/>
    </div>
    
    {/* Hamburger Menu */}
    <div className="md:hidden">
      <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#FD0054] text-3xl">
        ☰
      </button>
    </div>

    {/* Navigation Links */}
    <div className={`md:flex items-center space-x-4 absolute md:static top-16 right-0 bg-white w-full md:w-auto md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 transition-all duration-300 ease-in-out ${menuOpen ? 'block p-4' : 'hidden'}`}>
      <a href="#" className="block md:inline-block hover:text-[#FD0054]">Home</a>
      <a href="#" className="block md:inline-block hover:text-[#FD0054]">About</a>
      <a href="#" className="block md:inline-block hover:text-[#FD0054]">Products</a>
      <a href="/login-homepage" className="block md:inline-block hover:text-[#FD0054]">Login</a>
      <a href="#" className="block md:inline-block bg-[#FD0054] text-white px-4 py-2 rounded">CONTACT</a>
    </div>
  </nav>
</header>

      
      {/* Main Section */}
      <main className='mt-14'>
        <section className="container mx-auto ">
          <div
              className="relative h-[480px] bg-cover bg-center flex"
              style={{ backgroundImage: "url('/homepage-bg-1.jpg')" }}
            >
              <div className="container mx-auto mt-8 px-6 md:px-12 lg:px-16 xl:px-20">
                <div className=" bg-opacity-80   p-4  md:p-10 rounded-lg max-w-lg">
                  <p className="text-[#FD0054] mb-2 text-lg font-semibold">DISCOVER FRESHNESS</p>
                  <h1 className="text-4xl font-bold mb-4 text-[#2B2024]">Your online grocery solution</h1>
                  <p className="text-gray-700 mb-4">
                    WayMart offers fresh fruits, organic produce, and cereals with doorstep delivery. 
                    We prioritize quality and customer satisfaction.
                  </p>
                  <a href="#" className="bg-[#FD0054] text-white px-6 py-3 rounded-lg inline-block">View Products</a>
                </div>
              </div>
            </div>
        </section>
      
        {/* Product Section */}
      
          <section className="categories-section p-0 px-8 m-7 bg-[#f9f9f9]">
            <h2 className="text-3xl font-bold text-center mt-5 mb-8 text-[#A80038]">Our Categories</h2>
            
            <div className="categories-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
              {[
                { name: "Fruits", image: "/images/fruits.png", description: "Explore a variety of fresh fruits." },
                { name: "Vegetables", image: "/images/vegeatbles.png", description: "Discover fresh and organic vegetables." },
                { name: "Cereals", image: "/images/cereala.png", description: "Find high-quality cereals for a healthy diet." }
              ].map((category, index) => (
                <div 
                  key={index} 
                  className="category-card bg-white rounded-lg p-6 text-center shadow-md transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:bg-[rgba(252,0,84,0.1)]"
                >
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-[150px] h-[150px] mx-auto mb-4 mix-blend-darken"
                  />
                  <h3 className="text-2xl font-bold mb-2 text-[#2B2024]">{category.name}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              ))}
            </div>
          </section>


          <section className="facts-section relative w-full h-[200px] overflow-hidden">
      {/* Background Image */}
      <Image 
        src="/images/bg.png" 
        layout="fill" 
        objectFit="cover" 
        alt="Fruits and Vegetables"
        className="absolute inset-0 bg-cover "
        

      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
        <div className="text-black text-center max-w-2xl px-6">
          <h2 className="text-3xl font-bold mb-4">Did You Know?</h2>
          <p className="text-lg  bg-transparent px-4 py-3  transition-opacity duration-700 ease-in-out">
            {facts[factIndex]}
          </p>
        </div>
      </div>
    </section>
       
      
      
       
        <section className="container mx-auto px-8 py-12">
          <div className="bg-white shadow-lg rounded-lg p-8 grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#A80038]">We're here to assist you!</h2>
              <form className="grid gap-6">
                {["Name", "Email address", "Phone number"].map((label, index) => (
                  <div key={index}>
                    <label className="block mb-2">{label} *</label>
                    <input type="text" className="w-full p-3 border rounded" placeholder={label} />
                  </div>
                ))}
                <div>
                  <label className="block mb-2">Message</label>
                  <textarea className="w-full p-3 border rounded" rows="4"></textarea>
                </div>
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    I allow this website to store my submission to respond to my inquiry. *
                  </label>
                </div>
                <div>
                  <button className="bg-[#FD0054] text-white px-6 py-3 rounded w-full">SUBMIT</button>
                </div>
              </form>
            </div>

            {/* Google Map Section */}
            <section className="map-section p-8 bg-gray-100">
              <h2 className="text-3xl font-bold text-center mb-6 text-[#A80038]">Our Service Points</h2>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <DynamicMap />
              </div>
            </section>
          </div>
        </section>

      </main>
      
      {/* Footer */}
      <footer className="bg-[#2B2024] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 WayMart. All rights reserved.</p>
        </div>
      </footer>
    </div>


   </>
  );
}
