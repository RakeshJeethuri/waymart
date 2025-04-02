"use client"
import { useState, useEffect } from "react";

export default function ManageTeam() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem("teamMembers")) || [];
    setTeamMembers(storedMembers);
  }, []);

  const generatePasskey = () => {
    const passkey = Math.floor(100000 + Math.random() * 900000).toString();
    return passkey;
  };

  const addTeamMember = () => {
    if (teamMembers.length >= 4) {
      alert("You can only add up to 4 team members.");
      return;
    }
    if (teamMembers.some(member => member.designation === designation)) {
      alert(`A team member with the designation ${designation} already exists.`);
      return;
    }
    const passkey = generatePasskey();
    const newMember = { name, phone, designation, passkey };
    let updatedMembers;
    if (editIndex !== null) {
      updatedMembers = [...teamMembers];
      updatedMembers[editIndex] = newMember;
      setEditIndex(null);
    } else {
      updatedMembers = [...teamMembers, newMember];
    }
    setTeamMembers(updatedMembers);
    localStorage.setItem("teamMembers", JSON.stringify(updatedMembers));
    setName("");
    setPhone("");
    setDesignation("");
  };

  const editTeamMember = (index) => {
    setName(teamMembers[index].name);
    setPhone(teamMembers[index].phone);
    setDesignation(teamMembers[index].designation);
    setEditIndex(index);
  };

  const deleteTeamMember = (index) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedMembers);
    localStorage.setItem("teamMembers", JSON.stringify(updatedMembers));
  };

  return (
    <div className="main-content w-full  h-screen p-5 bg-[#FBF9FA] text-[#2B2024]">
      <header className="header flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Team</h1>
        
      </header>
      <section className="add-team-member mb-8">
        <h2 className="text-2xl font-bold mb-4">Add Team Member</h2>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded w-1/4"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-2 border rounded w-1/4"
          />
          <select
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="p-2 border rounded w-1/4"
          >
            <option value="">Select Designation</option>
            <option value="Inventory Manager">Inventory Manager</option>
            <option value="Order Fulfilment & Logistics Manager">Order Fulfilment & Logistics Manager</option>
            <option value="Customer Support Representative">Customer Support Representative</option>
            <option value="Finance & Accounting Manager">Finance & Accounting Manager</option>
          </select>
          <button onClick={addTeamMember} className="p-2 bg-[#A80038] text-white rounded">
            {editIndex !== null ? "Update Member" : "Generate Passkey"}
          </button>
        </div>
      </section>
      <section className="team-list grid grid-cols-1 gap-4 text-[#2B2024]">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card bg-[#FBF9FA] p-4 rounded shadow">
            <h3 className="text-xl font-bold mb-2">{member.name}</h3>
            <p className="team-details">Phone: {member.phone}</p>
            <p className="team-details">Designation: {member.designation}</p>
            <p className="team-details">Passkey: {member.passkey}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => editTeamMember(index)} className="p-2 bg-[#2B2024] text-white rounded">
                Edit
              </button>
              <button onClick={() => deleteTeamMember(index)} className="p-2 bg-[#A80038] text-white rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
