"use client"
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase, FaLock } from "react-icons/fa";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "9876543210",
    address: "123 Street, City",
    businessName: "Doe Enterprises",
    businessType: "Retail",
    panCard: "/adhar.pdf",
    proofOfBusiness: "/adhar.pdf",
    state: "California",
    district: "Los Angeles",
  });

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  
  return (
    <div className="bg-[#FBF9FA] p-6 flex flex-col  min-h-screen">
      <h1 className="text-[#FD0054] text-3xl font-bold mb-6">Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full ">
        {/* Personal Details */}
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-[#A80038] text-lg font-semibold mb-4">Personal Details</h2>
          <div className="space-y-4">
            <div className="flex items-center border rounded-lg p-2 bg-gray-100">
              <FaUser className="text-gray-500 mr-3" />
              <input type="text" name="name" placeholder="Full Name" value={profile.name} onChange={handleChange} className="w-full text-black bg-transparent focus:outline-none" />
            </div>
            <div className="flex items-center border rounded-lg p-2 bg-gray-100">
              <FaEnvelope className="text-gray-500 mr-3" />
              <input type="email" name="email" placeholder="Email" value={profile.email} onChange={handleChange} className="w-full text-black bg-transparent text-blackfocus:outline-none" />
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-[#A80038] text-lg font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-center border rounded-lg p-2 bg-gray-200">
              <FaPhone className="text-gray-500 mr-3" />
              <input type="text" name="phone" value={profile.phone} disabled className="w-full bg-transparent focus:outline-none text-gray-500" />
            </div>
            <div className="flex items-center border rounded-lg p-2 bg-gray-100">
              <FaMapMarkerAlt className="text-gray-500 mr-3" />
              <input type="text" name="address" placeholder="Address" value={profile.address} onChange={handleChange} className="w-full bg-transparent text-black focus:outline-none" />
            </div>
          </div>
        </section>

        {/* Business Details */}
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-[#A80038] text-lg font-semibold mb-4">Business Details</h2>
          <div className="space-y-4">
            <div className="flex items-center border rounded-lg p-2 bg-gray-200">
              <FaBriefcase className="text-gray-500 mr-3" />
              <input type="text" name="businessName" value={profile.businessName} disabled className="w-full bg-transparent focus:outline-none text-gray-500" />
            </div>
            <div className="flex items-center border rounded-lg p-2 bg-gray-200">
              <FaBriefcase className="text-gray-500 mr-3" />
              <input type="text" name="businessType" value={profile.businessType} disabled className="w-full bg-transparent focus:outline-none text-gray-500" />
            </div>
            <div className="mt-2">
              <label className="text-[#2B2024] font-semibold">PAN Card:</label>
              <a href={profile.panCard} className="text-[#A80038] underline ml-2" target="_blank" rel="noopener noreferrer">View PAN Card</a>
            </div>
            <div>
              <label className="text-[#2B2024] font-semibold">Proof of Business:</label>
              <a href={profile.proofOfBusiness} className="text-[#A80038] underline ml-2" target="_blank" rel="noopener noreferrer">View Proof</a>
            </div>
          </div>
        </section>
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-[#A80038] text-lg font-semibold mb-4">Address</h2>
          <div className="space-y-4">
            <input type="text" name="landmark" placeholder="Landmark" value={profile.landmark} onChange={handleChange} className="w-full text-black bg-gray-100 border p-2 rounded-lg" />
           
            <input type="text" name="city" placeholder="City" value={profile.city} onChange={handleChange} className="w-full bg-gray-100 text-black border p-2 rounded-lg" />
            <input type="text" name="district" placeholder="District" value={profile.district} onChange={handleChange} className="w-full text-black  bg-gray-100 border p-2 rounded-lg" />
            <input type="text" name="state" placeholder="State" value={profile.state} onChange={handleChange} className="w-full bg-gray-100 border text-black p-2 rounded-lg" />
            <input type="text" name="pincode" placeholder="Pincode" value={profile.pincode} onChange={handleChange} className="w-full text-black bg-gray-100 border p-2 rounded-lg" />
          </div>
        </section>
       
       
      </div>
      <button onClick={handleSubmit} className="w-full max-w-lg py-2 bg-[#A80038] text-white font-semibold rounded-lg hover:bg-[#FD0054] transition-all mt-6 self-center">Update Profile</button>

      
     
    </div>
  );
};

export default Profile;

