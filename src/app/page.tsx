'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from "lucide-react";
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
      <div className="bg-[#FBF9FA] text-[#2B2024] font-sans" id="home">
        <header className="bg-white shadow-md fixed top-0 w-full z-10000">
          <nav className="container mx-auto flex bg-white justify-between items-center p-4">
            <div className="text-2xl font-bold text-[#A80038]">
              <img src='/images/logo-bg-removed.png' width={150} height={50} alt="WayMart Logo" />
            </div>

            {/* Hamburger Menu */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#FD0054] text-3xl">
                ☰
              </button>
            </div>

            {/* Navigation Links */}
            <div className={` max-md:max-w-fit md:flex items-center max-md:space-y-2 space-x-4 absolute md:static top-16 right-0 bg-white w-full md:w-auto md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 transition-all duration-300 ease-in-out ${menuOpen ? 'block p-4' : 'hidden'}`}>
              <a href="#home" className="block md:inline-block hover:text-[#FD0054]">Home</a>
              <a href="#about" className="block md:inline-block hover:text-[#FD0054]">About</a>
              <a href="#products" className="block md:inline-block hover:text-[#FD0054]">Products</a>
              <a href="/login-homepage" className="block md:inline-block hover:text-[#FD0054]">Login</a>
              <a href="#form" className="block md:inline-block max-md:max-w-fit bg-[#FD0054] text-white px-4 py-1 rounded">CONTACT</a>
            </div>
          </nav>
        </header>

        {/* Main Section */}
        <main className='mt-14'>
          <section className="container mx-auto ">
            <div
              className="relative bg-no-repeat h-[480px] bg-cover bg-center flex transition-all duration-500 ease-in-out hover:scale-105"
              style={{ backgroundImage: "url('/homepage-bg-1.jpg')" }}
            >
              <div className="container mx-auto mt-8 px-6 md:px-12 lg:px-16 xl:px-20">
                <div className="bg-opacity-80 p-4 md:p-10 rounded-lg max-w-lg transition-all duration-50 ease-in-out ">
                  <p className="text-[#FD0054] mb-2 text-lg font-semibold">DISCOVER FRESHNESS</p>
                  <h1 className="text-4xl font-bold mb-4 text-[#2B2024]">Your online grocery solution</h1>
                  <p className="text-gray-700 mb-4">
                    WayMart offers fresh fruits, organic produce, and cereals with doorstep delivery. We prioritize quality and customer satisfaction.
                  </p>
                  <a href="#" className="bg-[#FD0054] text-white px-6 py-3 rounded-lg inline-block transition-all hover:scale-105">View Products</a>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="relative bg-gradient-to-b from-[#f8f9fa] to-[#fff] pt-20 py-2 px-8 md:px-24 text-center overflow-hidden" id="about">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-50px] left-[-50px] w-40 h-38 bg-[#FD0054] opacity-20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-50px] right-[-50px] w-40 h-40 bg-[#A80038] opacity-20 rounded-full blur-3xl"></div>

            {/* Title with Animation */}
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl font-bold text-[#A80038] mb-8"
            >
              About <span className="text-[#FD0054]">WayMart</span>
            </motion.h2>

            {/* Intro Paragraph */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-lg md:text-xl"
            >
              At <span className="text-[#FD0054] font-semibold">WayMart</span>, we bring farm-fresh vegetables, fruits, and cereals straight to your doorstep. We believe in quality, sustainability, and supporting local farmers to ensure you get the best produce every time.
            </motion.p>

            {/* Feature Cards with Animations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
              {[
                {
                  title: "🌿 Farm-to-Table Freshness",
                  desc: "We source directly from trusted farms, ensuring quality at every step.",
                },
                {
                  title: "🚀 Fast & Reliable Delivery",
                  desc: "Get your daily essentials delivered on time, every time.",
                },
                {
                  title: "🌍 Sustainable & Ethical",
                  desc: "We support eco-friendly sourcing and fair-trade practices.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="p-6 bg-white shadow-xl rounded-2xl transition-transform hover:scale-105 hover:shadow-2xl"
                >
                  <h3 className="text-2xl font-semibold text-[#A80038]">{item.title}</h3>
                  <p className="text-gray-600 mt-3">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Call to Action Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 bg-[#A80038] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#FD0054] transition-all shadow-lg"
            >
              Explore WayMart
            </motion.button>
          </section>

          {/* Product Section */}
          <div className='pt-4' id="products"></div>

          <section className="categories-section p-0 px-8 mx-5 my-12 bg-[#f9f9f9]">
            <h2 className="text-3xl font-bold text-center mt-5 mb-8 text-[#A80038]" >Our Categories</h2>

            <div className="categories-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
              {[
                { name: "Fruits", image: "/images/fruits.png", description: "Explore a variety of fresh fruits." },
                { name: "Vegetables", image: "/images/vegeatbles.png", description: "Discover fresh and organic vegetables." },
                { name: "Cereals", image: "/images/cereala.png", description: "Find high-quality cereals for a healthy diet." }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  className="category-card bg-white rounded-lg p-6 text-center shadow-md transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:bg-[rgba(252,0,84,0.1)] hover:shadow-2xl"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-[150px] h-[150px] mx-auto mb-4 mix-blend-darken"
                  />
                  <h3 className="text-2xl font-bold mb-2 text-[#2B2024]">{category.name}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </motion.div>
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
              className="absolute inset-0 bg-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
              <div className="text-black text-center max-w-2xl px-6">
                <h2 className="text-3xl font-bold mb-4">Did You Know?</h2>
                <p className="text-lg bg-transparent px-4 py-3 transition-opacity duration-700 ease-in-out">
                  {facts[factIndex]}
                </p>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="container mx-auto px-8 py-12" id="form">
            <div className="bg-white shadow-lg rounded-lg p-8 grid md:grid-cols-2 gap-8">

              <div>
                <h2 className="text-3xl font-bold mb-6 text-[#A80038]">We're here to assist you!</h2>
                <form className="grid gap-6">
                  {["Name", "Email address", "Phone number"].map((label, index) => (
                    <div key={index}>
                      <label className="block mb-2">{label} *</label>
                      <input type="text" className="w-full p-3 border rounded transition-all hover:shadow-xl" placeholder={label} />
                    </div>
                  ))}
                  <div>
                    <label className="block mb-2">Message</label>
                    <textarea className="w-full p-3 border rounded transition-all hover:shadow-xl" rows={4} ></textarea>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      I allow this website to store my submission to respond to my inquiry. *
                    </label>
                  </div>
                  <div>
                    <button className="bg-[#FD0054] text-white px-6 py-3 rounded w-full transition-all hover:bg-[#A80038] hover:scale-105">SUBMIT</button>
                  </div>
                </form>
              </div>

              {/* Google Map Section */}
              <section className="map-section py-8 bg-gray-100  max-md:h-[75%] rounded-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-[#A80038]">Our Service Points</h2>
                <div className=" overflow-hidden shadow-lg">
                  <DynamicMap />
                </div>
              </section>
            </div>
          </section>

        </main>

        {/* Footer */}
        {/* <footer className="bg-[#2B2024] text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2025 WayMart. All rights reserved.</p>
          </div>
        </footer> */}
        <footer className="bg-[#2B2024] text-white py-8">
  <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
    
    {/* Left Column - Company Info & Navigation */}
    <div className="text-center md:text-left">
      <h2 className="text-2xl font-semibold mb-4">WayMart</h2>
      <p className="text-sm mb-4">
        Your trusted marketplace for fresh vegetables, fruits, and cereals.
      </p>
      <nav>
        <ul className="space-y-2">
          <li><a href="/about" className="hover:underline">About Us</a></li>
          <li><a href="/contact" className="hover:underline">Contact</a></li>
          <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
          <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
        </ul>
      </nav>
    </div>

    {/* Right Column - Contact & Social Media */}
    <div className="text-center space-y-2 md:text-right">
      <h2 className="text-lg font-semibold mb-4">Get in Touch</h2>
      <p className="text-sm">📍 Sohini Tech Park , Hyderabad , India </p>
      <p className="text-sm">📞 +91 0110-2000-02</p>
      <p>You can write your queries in contact form</p>
      <p className="text-sm mb-4">✉️ support@waymart.com</p>
      <></>
      
      {/* Social Media Icons */}
      <div className="flex justify-center  md:justify-end space-x-4">
            <a href="#" aria-label="Facebook">
              <FacebookIcon className="w-6 h-6 hover:text-gray-400" />
            </a>
            <a href="#" aria-label="Twitter">
              <TwitterIcon className="w-6 h-6 hover:text-gray-400" />
            </a>
            <a href="#" aria-label="Instagram">
              <InstagramIcon className="w-6 h-6 hover:text-gray-400" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <LinkedinIcon className="w-6 h-6 hover:text-gray-400" />
            </a>
          </div>
     
    </div>
  </div>

  {/* Bottom Section - Copyright */}
  <div className="text-center text-xs mt-8 border-t border-gray-600 pt-4">
    &copy; 2025 WayMart. All rights reserved.
  </div>
</footer>

      </div>
    </>
  );
}
