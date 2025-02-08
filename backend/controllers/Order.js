import { Order } from "../models/order.js";

export const createNewOrder = async (req,res) => {
  try {
    const { products, paymentMode, address } = req.body;
    const {user} = req.decodedUser

    if (!products || !paymentMode || !address) {
      throw new Error("All fields are required.");
    }

    const overallCost = products.reduce((total, product) => {
      return total + product.price;
    }, 0);

    const newOrder = new Order({
      products,
      overallCost,
      paymentMode,
      deliveryAddress:address,
      user
    });

    const savedOrder = await newOrder.save();

    return res.status(200).json({message:"Order success"});
  } catch (error) {
    console.error("Error creating new order:", error.message);
    throw new Error("Failed to create order");
  }
};
