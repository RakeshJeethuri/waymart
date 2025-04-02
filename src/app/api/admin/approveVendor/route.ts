import { NextRequest, NextResponse } from "next/server";

import Vendor from "@/models/vendorModel";
import transporter from "@/models/nodeMailer";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
    try {

        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ message: "Vendor ID is required", success: false }, { status: 400 });
        }


        const vendor = await Vendor.findById(id);

        if (!vendor) {
            return NextResponse.json({ message: "Vendor not found", success: false }, { status: 404 });
        }


        if (vendor.isVerified) {
            return NextResponse.json({ message: "Vendor is already verified", success: false }, { status: 400 });
        }

        vendor.isVerified = true;
        vendor.isActive = true;
        await vendor.save();

        const mailOptions = {
            from: `"Way Mart" <${process.env.SENDER_EMAIL}>`,
            to: vendor.email,
            subject: "Vendor Verification Successful",
            text: `Dear ${vendor.name},\n\nYour account has been successfully verified and activated. Welcome to Way Mart!\n\nBest regards,\nWay Mart Team`,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({
            message: "Vendor approved and email sent successfully",
            data: vendor,
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message, success: false }, { status: 500 });
    }
}


/*
import axios from "axios";

const approveVendor = async (id) => {
    try {
        const response = await axios.post("http://localhost:3000/api/admin/approveVendor", {
            id, // Pass the vendor ID in the request body
        });

        console.log("Vendor approved:", response.data);
    } catch (error) {
        console.error("Error approving vendor:", error.response?.data || error.message);
    }
};

// Example usage
approveVendor("12345"); // Replace "12345" with the actual vendor ID
*/  