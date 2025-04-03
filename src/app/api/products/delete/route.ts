import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';

connect();

// Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const productId = searchParams.get("productId");
        const vendorId = searchParams.get("vendorId");
        const imgId = searchParams.get("imgId");
        
        console.log("Product ID:", productId);
        console.log("Vendor ID:", vendorId);
        console.log("Image ID:", imgId);

        // Validate required parameters
        if (!productId || productId === "undefined") {
            return NextResponse.json({ error: "Valid Product ID is required" }, { status: 400 });
        }

        if (!vendorId) {
            return NextResponse.json({ error: "Vendor ID is required" }, { status: 400 });
        }

        if (!imgId) {
            return NextResponse.json({ error: "Image ID is required" }, { status: 400 });
        }

        // Validate MongoDB ObjectId format
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return NextResponse.json({ error: "Invalid Product ID format" }, { status: 400 });
        }

        // Find product to ensure it exists and belongs to vendor
        const product = await Product.findOne({ 
            _id: productId, 
            vendor: vendorId 
        });

        if (!product) {
            return NextResponse.json({ error: "Product not found or unauthorized" }, { status: 404 });
        }

        // Step 1: Delete the product from database first
        const deleteResult = await Product.findByIdAndDelete(productId);
        
        if (!deleteResult) {
            return NextResponse.json({ 
                error: "Failed to delete product from database", 
                success: false 
            }, { status: 500 });
        }
        
        console.log("Product successfully deleted from database");
        
        // Step 2: Now that product is deleted, delete the image from Cloudinary
        let cloudinaryResult;
        try {
            cloudinaryResult = await cloudinary.uploader.destroy(imgId);
            console.log("Cloudinary delete result:", cloudinaryResult);
            
            if (cloudinaryResult.result !== 'ok') {
                return NextResponse.json({
                    message: "Product deleted but image deletion may have failed",
                    success: true,
                    productDeleted: true,
                    imageDeleteResult: cloudinaryResult
                });
            }
        } catch (cloudinaryError) {
            console.error("Cloudinary deletion error:", cloudinaryError);
            return NextResponse.json({
                message: "Product deleted but image deletion failed",
                success: true,
                productDeleted: true,
                imageDeleted: false,
                error: (cloudinaryError as Error).message
            });
        }
        
        // Both operations successful
        return NextResponse.json({
            message: "Product and image deleted successfully",
            success: true,
            productDeleted: true,
            imageDeleted: true,
            cloudinaryResult
        });

    } catch (error: unknown) {
        console.log("Operation failed: ", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}