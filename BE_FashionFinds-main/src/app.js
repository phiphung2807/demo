import express from "express";
import connectDB from "./config/database";
import dotenv from "dotenv";
import cors from "cors";
import ProductRouter from "./routes/Product";
import ProductPassRouter from "./routes/ProductPass";
import UserRouter from "./routes/User";
import AuthRouter from "./routes/Auth";
import CategoryRouter from "./routes/Category";
import uploadRouter from "./routes/upload";
import CommentRouter from "./routes/Comment";
import CartRouter from "./routes/Cart";
import BillRouter from "./routes/Bill";
import mongoose from "mongoose";

dotenv.config();

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(cors());

//Router
app.use("/api", ProductRouter);
app.use("/api", ProductPassRouter)
app.use("/api", CategoryRouter);
app.use("/api", UserRouter);
app.use("/api", AuthRouter);
app.use("/api", uploadRouter);
app.use("/api", CommentRouter);
app.use("/api", CartRouter);
app.use("/api", BillRouter);

// KẾT NỐI MONGO
// connectDB(process.env.MONGO_URL);
mongoose.connect("mongodb://127.0.0.1:27017/demo");
// VITENODEAPP
export const viteNodeApp = app;
