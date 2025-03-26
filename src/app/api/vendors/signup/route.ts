import {connect} from "@/dbConfig/dbConfig";
import Vendor from "@/models/vendorModel";
import {NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import transporter from "@/models/nodeMailer";
import { v5 as uuidv5 } from 'uuid';
connect();

export async function POST(request:NextRequest) {
    try {
       const reqBody= await request.json();
       const {name,email,password,phone,address,businessName,businessType,PAN,proofOfBusiness}=reqBody;
       console.log(reqBody);

       if(!name || !email || !phone || !address || !password || !businessName || !businessType || !PAN || !proofOfBusiness){
        return NextResponse.json({error:"Please fill all the fields"},{status:400})
       }

       const vendor=await Vendor.findOne({email});
       if(vendor){
        return NextResponse.json({error:"Vendor already exists"},{status:400})
       }

       const NAMESPACE = uuidv5.DNS; // Predefined namespace for consistency
       const data = [email,businessName,PAN].join('|'); 
       const uniqueId = uuidv5(data, NAMESPACE);

       console.log(uniqueId);

       const passkey = Math.floor(100000 + Math.random() * 900000); // Ensures a 6-digit number
       console.log(`Generated Passkey: ${passkey}`);

       const salt=await bcryptjs.genSalt(10);
       const hashedPassword=await bcryptjs.hash(password,salt);

       const newVendor=new Vendor({
        vendorId:uniqueId,
        name,
        email,
        phone,
        password:hashedPassword,
        address,
        businessName,
        businessType,
        PAN,
        proofOfBusiness,
        passkey
       })

       const savedVendor=await newVendor.save();
       console.log(savedVendor);

       const mailOptions = {
        from: `"Way Mart" <${process.env.SENDER_EMAIL}>`,
        to: email,
        subject: "Your Vendor Account Passkey",
        text: `Dear ${name},\n\nYour vendor account has been successfully created. Your passkey is: ${passkey}\n\nThank you for joining us!\n\nBest regards,\nWaymart Team`
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

       return NextResponse.json({
        message:"Vendor created successfully",
        success:true,
        savedVendor
       },{status:201});
       }
    catch (error) {
        return NextResponse.json({error:`Database Error: ${error}`},{status:500})
        
    }

}
