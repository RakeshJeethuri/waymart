import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide a username"],
    },
    email:{
        type:String,
        required:[true,"Please provide a email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide a password"]
    },
    phone: {
        type: String,
        required: [true, "Please provide a phone"],
        unique: true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})
const User = mongoose.models.User || mongoose.model('User',userSchema);
export default User;