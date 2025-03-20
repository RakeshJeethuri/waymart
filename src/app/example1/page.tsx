"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
export default function SignupPage() {
    const router = useRouter();
    const [user,setUser] = React.useState({username:"",email:"",password:""});
    const [buttonDisabled,setButtonDisabled] = React.useState(false);
    const [loading,setLoading] = React.useState(false);
    const onSignup = async () => {
        try {
          const response =  await axios.post("/api/users/signup",user);
          console.log("signup success",response.data);
          router.push("/login");
        } catch (error:any) {
            console.log("signup error",error.message);
            toast.error(error.message);
        }
        
    }
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    },[user])

    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>SIgnup</h1>
        <hr />
        <label htmlFor="username">Username</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white bg-gray-700"
        type="text" id="username" value={user.username} onChange={(e) => setUser({...user,username:e.target.value}) } placeholder="UserName"></input>
      
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white bg-gray-700"
        type="text" id="email" value={user.email} onChange={(e) => setUser({...user,email:e.target.value}) } placeholder="email"></input>
        
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white bg-gray-700"
        type="password" id="password" value={user.password} onChange={(e) => setUser({...user,password:e.target.value}) } placeholder="password"></input>

        <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled?"no Signup":"Signup"}</button>

        <Link href="/login" className="underline">Visit Login</Link>

    </div>);
}