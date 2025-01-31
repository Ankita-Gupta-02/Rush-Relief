import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    }],
    date: {
        type: Date,
        default: Date.now
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    overallCost: {
        type: Number,
        required: true
    },
    paymentMode: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'PayPal', 'Cash on Delivery'],
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true
    }
});

export const Order = mongoose.model('Order', orderSchema);

