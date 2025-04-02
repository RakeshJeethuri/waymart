import { connect } from "@/dbConfig/dbConfig";
import Address from "@/models/addressModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, address } = body;

        if (!userId || !address) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Create a new address entry
        const newAddress = new Address({ userId, address });
        await newAddress.save();

        return NextResponse.json({
            message: "Address added successfully",
            success: true,
            address: newAddress
        }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}