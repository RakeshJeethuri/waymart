import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest,NextResponse } from "next/server";

import Vendor from "@/models/vendorModel";
import { connect } from "@/dbConfig/dbConfig";

connect();
export async function GET(request:NextRequest){
    try {
        const vendorID = await getDataFromToken(request);
        const vendor = await Vendor.findOne({_id:vendorID})
        return NextResponse.json({
            message:"Vendor found",
            data:vendor,
            success:true
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400});
    }
}

