import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse } from "next/server";
import transporter from "@/models/nodeMailer";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody;
        const user = await User.findOne({email});
        if(!user) {
            return NextResponse.json({error:"User does not exist",success:false},{status:400});
        }
        const  hashedPassword= await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        const mailOptions = {
            from: `"Way Mart" <${process.env.SENDER_EMAIL}>`,
            to: user.email,
            subject: "Account Password Change",
            text: `Your password has been changed successfully!`,
        };  
        await transporter.sendMail(mailOptions);        
        const response = NextResponse.json({message:"Password changed successfully",success:true},{status:200});
        return response;
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
        }
}