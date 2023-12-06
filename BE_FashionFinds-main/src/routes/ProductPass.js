import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductByCategory,
  getProductById,
  getProductBySlug,
  getall,
  updateProduct,
} from "../controller/ProductPass";
import { authenticate } from "../middleware/Authenticate";
import { authorization } from "../middleware/Authorization";
const Router = express.Router();
Router.get("/products/pass", getall);
Router.get("/products/pass/:id", getProductById);
Router.get("/product/pass/:slug/:id", getProductBySlug);
Router.delete("/products/pass/:id", authenticate, authorization, deleteProduct);
Router.put("/products/pass/:id", authenticate, authorization, updateProduct);
Router.post("/products/pass", authenticate, authorization, createProduct);
Router.get("/products/pass/categoryId/:id", getProductByCategory);
export default Router;