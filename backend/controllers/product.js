import { Product } from "../models/Product";

export const getProducts = async (req,res)=>{
try {
    const products = await Product.find()
    return res.status(200).send({products})
} catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal error", error: error.message });
}
}


export const getProduct = async (req,res)=>{
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        return res.status(200).send({product})
    } catch (error) {
        console.log(error);
        return res
          .status(500)
          .send({ message: "Internal error", error: error.message });
    }
    }