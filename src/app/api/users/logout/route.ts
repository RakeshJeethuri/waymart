import { NextResponse } from "next/server";

export async function GET() {
try {
    const response = NextResponse.json({message:"Logout successful",success:true},{status:200});
    response.cookies.set("token","",{httpOnly:true,path:"/",expires: new Date(0)});
    response.cookies.set("userType", "", { expires: new Date(0), path: "/" });
    return response
} catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
    
}
}