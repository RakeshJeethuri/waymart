"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
export default function ProfilePage() {
    const router = useRouter();
    const[data,setData] = useState("nothing")
    const logout = async() => {

        try {
         await axios.get("/api/users/logout");
         toast.success("Logout successful");
         router.push("/login");
         
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message);
        }
    }
    const getUserDetails = async()=>{
        try {
            const res =  await axios.get("/api/users/me");
            console.log(res.data)
            setData(res.data.data._id)
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2>{data === 'nothing'?"":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <button onClick={logout} className="p-2 ml-2rounded bg-orange-500 rounded-lg text-black ">Logout</button>
            <button onClick={getUserDetails} className="p-2 ml-2rounded bg-purple-500 rounded-lg text-black ">getuser details</button>
        </div>
    );
}