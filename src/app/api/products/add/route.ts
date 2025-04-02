import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import Vendor from "@/models/vendorModel";
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
// import { auth } from '@clerk/nextjs/server';
connect();



// Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

interface CloudinaryUploadResult {
    public_id: string;
    [key: string]: any
}

export async function POST(request: NextRequest) {

    try {
        const formData = await request.formData();
        console.log("form data: ", formData);
        const file = formData.get("image") as File | null;

        const vendorId=formData.get("vendorId") as string | "";
        const name=formData.get("name") as string | "";
        const description=formData.get("description") as string | "";
        const price=formData.get("price") as string | "";
        const stock=formData.get("stock") as string | "";
        const category=formData.get("category") as string | "";


        if(!file){
            return NextResponse.json({error: "File not found"}, {status: 400})
        }

        // Check if vendor exists
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
        }


        

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const result = await new Promise<CloudinaryUploadResult>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {folder: "next-cloudinary-uploads"},
                    (error, result) => {
                        if(error) reject(error);
                        else resolve(result as CloudinaryUploadResult);
                    }
                )
                uploadStream.end(buffer)
            }
        )
        console.log("Image public id: ",result.public_id);

        // Create new product
        const product = new Product({ vendor: vendorId, name, description, price, stock, category, image:result.public_id });
        await product.save();
        return NextResponse.json(
            {
                message: "Product added successfully",
                success: true,
                product,
                publicId: result.public_id
            },
            {
                status: 200
            }
        )

    } catch (error) {
        console.log("Upload image failed", error)
        return NextResponse.json({error: "Upload image failed"}, {status: 500})
    }

}
