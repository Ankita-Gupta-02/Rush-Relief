import express, { response } from "express";
import mongoose from "mongoose";
import { User } from "./models/user.js";
import userRouter from "./routes/user.js";
import cors from "cors";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import { Product } from "./models/Product.js";
import env from "dotenv";
import { Category } from "./models/category.js";
import { Order } from "./models/order.js";
import { Rating } from "./models/rating.js";
import productRouter from "./routes/Product.js";
import orderRouter from "./routes/order.js";

env.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/user", userRouter);

app.use("/product", productRouter);

app.use("/order",orderRouter)

app.get("/", (req, res) => {
  res.send("Hello World");
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("DB Connected");
    AdminJS.registerAdapter({
      Resource: AdminJSMongoose.Resource,
      Database: AdminJSMongoose.Database,
    });

    const admin = new AdminJS({
      resources: [User, Product, Category, Order, Rating],
    });

    const adminRouter = AdminJSExpress.buildRouter(admin);
    app.use(admin.options.rootPath, adminRouter);
    app.listen(3000, (error) => {
      if (error) console.log("Not started " + error);
      else console.log("Server started" + admin.options.rootPath);
    });
  })
  .catch((error) => {
    console.log(error);
  });
