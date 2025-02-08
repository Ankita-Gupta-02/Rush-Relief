import { Category } from "../models/category.js";

export const getCategories = async (req,res)=>{
try {
    const categories = await Category.find()
    return res.status(200).send({categories})
} catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal error", error: error.message });
}
}


export const getCategory = async (req,res)=>{
    try {
        const {id} = req.params
        const category = await Category.findById(id)
        return res.status(200).send({category})
    } catch (error) {
        console.log(error);
        return res
          .status(500)
          .send({ message: "Internal error", error: error.message });
    }
    }