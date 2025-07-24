import mongoose from "mongoose";

const userSchema = new mongoose.Schema(

    {
        userName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        avatar: {
            type: String,
            default:"https://hoseiki.vn/wp-content/uploads/2025/03/avatar-fb-3.jpg"
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["User" | "admin"],
            default: "User",
        },
    
        
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
export default User;