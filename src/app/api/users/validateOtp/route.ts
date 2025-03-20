import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse } from "next/server";
import transporter from "@/models/nodeMailer";

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {email,userotp} = reqBody;
        console.log("send verify otp")
        const user = await User.findOne({email});
        if(!user) {
            return NextResponse.json({error:"User does not exist",success:false},{status:400});
        }
        if(userotp==="" || userotp !== user.verifyToken) {
            return NextResponse.json({error:"Invalid OTP",success:false},{status:400});
        }
        user.isVerified = true;
        user.verifyToken = null;
        user.verifyTokenExpiry = null;
        await user.save();
        const mailOptions = {
            from: `"Way Mart" <${process.env.SENDER_EMAIL}>`,
            to: user.email,
            subject: "Account Verification successfull",
            text: `Enjoy the Waymart experience!`,
        };
        await transporter.sendMail(mailOptions);
        const response = NextResponse.json({message:"Verified successfully",success:true},{status:200});
        return response;
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
        }

}   