import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();
 
export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {email,password}=reqBody;
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({message:"User does not exist",success:false},{status:400})
        }
        const validPassword = await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({message:"Invalid Password",success:false},{status:400})
        }
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
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
        response.cookies.set("userType", "user", { httpOnly: true, path: "/" });
        return response

        console.log(reqBody);
    } catch (error:any) {
        return NextResponse.json({error:error.message+"hello catch"},{status:500})
    }
}
 
