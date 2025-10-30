import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: [
        {
            area: String,
            city: String,
            state: String,
            pincode: String,
            country: String
        }
    ]
})

export const User = mongoose.model("User", userSchema);