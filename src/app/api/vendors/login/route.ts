import {connect} from "@/dbConfig/dbConfig";
import Vendor from "@/models/vendorModel";
import {NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();
 
export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {email,password}=reqBody;
        const vendor = await Vendor.findOne({email})
        if(!vendor){
            return NextResponse.json({error:"Vendor does not exist",success:false},{status:400})
        }
        const validPassword = await bcryptjs.compare(password,vendor.password)
        if(!validPassword){
            return NextResponse.json({error:"Invalid Password",success:false},{status:400})
        }
        if(vendor.isVerified === false) {
            return NextResponse.json({ error: "Vendor is not verified",status: false }, { status: 401 });
        }
        const tokenData = {
            id:vendor._id,
            username:vendor.username,
            email:vendor.email
        }
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})
        const response = NextResponse.json(
            {
                message:"Login successful",
                success:true
            },
            {
                status:200
            }
        )
        response.cookies.set("token",token,{httpOnly:true,
            path:"/"})
        response.cookies.set("userType", "vendor", { httpOnly: true, path: "/" });
        return response

        console.log(reqBody);
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
 
