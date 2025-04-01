import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    },
    name: {
        type: String,
        required: [true, "Please provide a product name"]
    },
    description: {
        type: String,
        required: [true, "Please provide a description"]
    },
    price: {
        type: Number,
        required: [true, "Please provide a price"]
    },
    stock: {
        type: Number,
        required: [true, "Please provide stock quantity"],
        min: 0
    },
    category: {
        type: String,
        required: [true, "Please provide a category"]
    },
    image: {
        type: String,  // Store image URL
        required: [true, "Please provide an image"]
    }
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
