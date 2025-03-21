import mongoose from "mongoose";
const vendorSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide a username"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Please provide a email"],
        unique:true
    },
    phone:{
        type:String,
        required:[true,"Please provide a phone"]
    },
    password:{
        type:String,
        required:[true,"Please provide a password"]
    },
    businessName:{
        type:String,
        required:[true,"Please provide a business name"]
    },
    businessType:{
        type:String,
        required:[true,"Please provide a business type"]
    },
    PAN:{
        type:String,
        required:[true,"Please provide a PAN number"]
    },
    proofOfBusiness:{
        type:String,
        required:[true,"Please provide a proof of business"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
})
const Vendor = mongoose.models.Vendor || mongoose.model('Vendor',vendorSchema);
export default Vendor;