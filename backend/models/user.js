import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:"Name is required"
    },
    email: {
        type: String,
        unique: true,
        required:"Email is required"
    },
    password:{
        type: String,
        required:"Password is required"
    },
    contact:{
        type: Number,
        unique:true,
        required:"Contact is required"
    },
    address:{
        type: String,
        required:"Address is required"
    },
}) 

export const User = mongoose.model("users", userSchema)