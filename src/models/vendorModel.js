import mongoose from "mongoose";
const vendorSchema = new mongoose.Schema({
    vendorId: {
        type: String,
        required: [true, "Please provide a vendorId"],
        unique: true
    },
    name: {
        type: String,
        required: [true, "Please provide a name"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    phone: {
        type: String,
        required: [true, "Please provide a phone"],
        unique: true
    },
    address: {
        type: String,
        required: [true, "Please provide an address"]
    },
    businessName: {
        type: String,
        required: [true, "Please provide a business name"],
        unique: true
    },
    businessType: {
        type: String,
        required: [true, "Please provide a business type"]
    },
    PAN: {
        type: String,
        required: [true, "Please provide a PAN number"],
        unique: true
    },
    proofOfBusiness: {
        type: String,
        required: [true, "Please provide a proof of business"]
    },
    passkey: {
        type: String,
        required: [true, "Please provide a passkey"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date
});
const Vendor = mongoose.models.Vendor || mongoose.model('Vendor',vendorSchema);
export default Vendor;