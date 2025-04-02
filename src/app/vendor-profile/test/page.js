"use client"
import { motion } from "framer-motion";
import { FaLeaf, FaCarrot, FaSeedling, FaTruck, FaAppleAlt, FaRegSmile } from "react-icons/fa";

export default function VegetablesInfo() {
  return (
    <div className="relative container mx-auto py-16 px-8 overflow-hidden bg-white">
      
      {/* Background Animated Elements */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }} 
        animate={{ x: 0, opacity: 0.2 }} 
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-10 left-10 w-32 h-32 bg-[#FD0054] opacity-20 rounded-full blur-3xl"
      ></motion.div>

      <motion.div 
        initial={{ x: 100, opacity: 0 }} 
        animate={{ x: 0, opacity: 0.2 }} 
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 right-10 w-32 h-32 bg-[#A80038] opacity-20 rounded-full blur-3xl"
      ></motion.div>

      {/* Title Section */}
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center mb-10 text-[#A80038]"
      >
        🥦 Fresh Vegetables at <span className="text-[#FD0054]">WayMart</span>
      </motion.h2>

      {/* Introduction Section */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-10"
      >
        At <span className="font-semibold text-[#FD0054]">WayMart</span>, we bring you farm-fresh, organic vegetables. Our produce is sourced from local farms, ensuring top-notch quality. From leafy greens to root vegetables, enjoy fresh, chemical-free, and affordable veggies!
      </motion.p>

      {/* Qualities and Benefits Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {[
          {
            title: "🌱 Rich in Nutrients",
            description: "Our vegetables are packed with essential vitamins and minerals.",
            icon: <FaLeaf className="text-[#FD0054] text-5xl" />
          },
          {
            title: "🚜 Locally Sourced",
            description: "We support local farmers and promote fresh farm-to-table produce.",
            icon: <FaCarrot className="text-[#A80038] text-5xl" />
          },
          {
            title: "🧑‍🌾 100% Organic",
            description: "Chemical-free and naturally grown vegetables for a healthy life.",
            icon: <FaSeedling className="text-[#FD0054] text-5xl" />
          },
          {
            title: "🚛 Fast Delivery",
            description: "Get your fresh vegetables delivered right to your doorstep.",
            icon: <FaTruck className="text-[#A80038] text-5xl" />
          },
          {
            title: "🍏 Wide Variety",
            description: "From leafy greens to exotic veggies, we have it all!",
            icon: <FaAppleAlt className="text-[#FD0054] text-5xl" />
          },
          {
            title: "😊 Affordable & Fresh",
            description: "We ensure freshness at the best prices in the market.",
            icon: <FaRegSmile className="text-[#A80038] text-5xl" />
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-transform hover:scale-105 duration-300"
          >
            <div className="flex items-center justify-center mb-4">{item.icon}</div>
            <h3 className="text-2xl font-semibold text-[#A80038] text-center">{item.title}</h3>
            <p className="text-gray-600 text-center mt-3">{item.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#A80038] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#FD0054] transition-all shadow-lg"
        >
          Explore Our Vegetables
        </motion.button>
      </div>
    </div>
  );
}
