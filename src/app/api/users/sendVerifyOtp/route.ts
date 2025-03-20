import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse } from "next/server";
import transporter from "@/models/nodeMailer";

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {email} = reqBody;
        console.log("send verify otp")
        const user = await User.findOne({email});
        if(!user) {
            return NextResponse.json({error:"User does not exist",success:false},{status:400});
        }
        if(user.isVerified) {
            return NextResponse.json({error:"User is already verified",success:false},{status:400});
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        user.verifyToken = otp;
        user.verifyTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
        await user.save();
        const mailOptions = {
            from: `"Way Mart" <${process.env.SENDER_EMAIL}>`,
            to: user.email,
            subject: "Account Verification OTP",
            text: `Your OTP is ${otp}. Verify your account using this OTP.`,
          };
          await transporter.sendMail(mailOptions);
        const response = NextResponse.json({message:"OTP sent successfully",success:true},{status:200});
        return response;
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
        }

}   