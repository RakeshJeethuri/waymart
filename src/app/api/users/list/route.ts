import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request:NextRequest) {
    try {
        const users = await User.find();
        return NextResponse.json({
            message:"Users found",
            data:users,
            success:true
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}