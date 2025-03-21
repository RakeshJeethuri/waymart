import {connect} from "@/dbConfig/dbConfig";
import Vendor from "@/models/vendorModel";
import {NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request:NextRequest) {
    try {
       const reqBody= await request.json();
       const {username,email,phone,password,businessName,businessType,PAN,proofOfBusiness}=reqBody;
       console.log(reqBody);

       if(!username || !email || !phone || !password || !businessName || !businessType || !PAN || !proofOfBusiness){
        return NextResponse.json({error:"Please fill all the fields"},{status:400})
       }

       const vendor=await Vendor.findOne({email});
       if(vendor){
        return NextResponse.json({error:"Vendor already exists"},{status:400})
       }

       const salt=await bcryptjs.genSalt(10);
       const hashedPassword=await bcryptjs.hash(password,salt);

       const newVendor=new Vendor({
        username,
        email,
        phone,
        password:hashedPassword,
        businessName,
        businessType,
        PAN,
        proofOfBusiness
       })

       const savedVendor=await newVendor.save();
       console.log(savedVendor);

       return NextResponse.json({
        message:"Vendor created successfully",
        success:true,
        savedVendor
       },{status:201});
       }
    catch (error) {
        return NextResponse.json({error:"Database Error"},{status:500})
        
    }

}
