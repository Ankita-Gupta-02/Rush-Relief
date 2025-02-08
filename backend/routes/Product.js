import express from "express";
import { getProduct, getProducts } from "../controllers/product.js";

const productRouter = express.Router()

productRouter.get("/list",getProducts)
productRouter.get("/:id",getProduct)

export default productRouter