import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({name:String, image: String})

export const Category = mongoose.model("category", categorySchema)