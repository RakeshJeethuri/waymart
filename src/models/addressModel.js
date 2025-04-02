import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    address: {
        type: String,
        required: [true, "Please provide a street address"],
    },}, { timestamps: true });

const Address = mongoose.models.Address || mongoose.model("Address", addressSchema);
export default Address;
