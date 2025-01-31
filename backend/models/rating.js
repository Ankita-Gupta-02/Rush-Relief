import mongoose from "mongoose"

const ratingSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String // URL of the image
    },
    message: {
        type: String,
        trim: true
    },
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
});

export const Rating = mongoose.model('Rating', ratingSchema);

