import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import Vendor from "@/models/vendorModel";
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
// import { auth } from '@clerk/nextjs/server';
connect();

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const productId = searchParams.get("productId");
        const vendorId = searchParams.get("vendorId");

        if (!productId || !vendorId) {
            return NextResponse.json({ error: "Product ID and Vendor ID are required" }, { status: 400 });
        }

        // Check if product exists
        const product = await Product.findOne({ _id: productId, vendor: vendorId });

        if (!product) {
            return NextResponse.json({ error: "Product not found or unauthorized" }, { status: 404 });
        }

        await Product.findByIdAndDelete(productId);

        return NextResponse.json({
            message: "Product deleted successfully",
            success: true
        });

    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}