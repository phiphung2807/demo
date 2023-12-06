import express from "express";

import {
  create,
  getCategoryBySlug,
  deleteCategory,
  getAllcategory,
  updateCategory,
  getCategoryProducts,
  getCategoryById,
} from "../controller/Category";
import { authorization } from "../middleware/Authorization";
import { authenticate } from "../middleware/Authenticate";

const router = express.Router();
router.get("/categories/pass", getAllcategory);
router.get("/categories/pass:id", getCategoryById);
router.get("/category/pass:slug", getCategoryBySlug);
router.post("/categories/pass", authenticate, authorization, create);
router.delete("/categories/pass:id", authenticate, authorization, deleteCategory);
router.put("/categories/pass:id", authenticate, authorization, updateCategory);
router.get("/categories/pass:id/products", getCategoryProducts);
export default router;