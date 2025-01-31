import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    mrp:Number,
    images:[],
    rating:[],
    avgRating:Number, 
    category:{
        type: mongoose.Schema.Types.ObjectId, ref:"category"
    }
})
export const Product = mongoose.model("products", productSchema)