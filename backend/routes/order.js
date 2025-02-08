import express from "express";
import { verifyLogin } from "../middlewares/index.js";
import {createNewOrder} from "../controllers/Order.js"

const orderRouter = express.Router();

orderRouter.post("/new", verifyLogin, createNewOrder);

export default orderRouter;
