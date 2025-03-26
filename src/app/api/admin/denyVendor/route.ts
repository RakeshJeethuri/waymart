import { NextRequest, NextResponse } from "next/server";

import Vendor from "@/models/vendorModel";
import transporter from "@/models/nodeMailer";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function DELETE(request: NextRequest) {
    try {
        // Parse the request body to get the vendor ID
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ message: "Vendor ID is required", success: false }, { status: 400 });
        }

        // Find the vendor by ID
        const vendor = await Vendor.findById(id);

        if (!vendor) {
            return NextResponse.json({ message: "Vendor not found", success: false }, { status: 404 });
        }

        // Check if the vendor is already verified
        if (vendor.isVerified) {
            return NextResponse.json({
                message: "Verified vendors cannot be removed",
                success: false,
            }, { status: 400 });
        }

        // Delete the vendor from the database
        await Vendor.findByIdAndDelete(id);

        // Send a regret email to the vendor
        const mailOptions = {
            from: `"Way Mart" <${process.env.SENDER_EMAIL}>`,
            to: vendor.email,
            subject: "Vendor Application Denied",
            text: `Dear ${vendor.username},\n\nWe regret to inform you that your vendor application has not been accepted due to our internal policies. If you have any questions, feel free to contact us.\n\nBest regards,\nWay Mart Team`,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({
            message: "Vendor removed successfully and regret email sent",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message, success: false }, { status: 500 });
    }
}