import { Router } from "express";
import { productList, createProduct, getProductById, deleteProduct, updateProduct } from "../controllers/product.controller";
import multer from "../libs/multer";

const router = Router();

router.route("/product/list").get(productList);
router.route("/product/create").post(multer.single("image"), createProduct);
router.route("/product/detail/:id").get(getProductById);
router.route("/product/delete/:id").delete(deleteProduct);
router.route("/product/update/:id").put(updateProduct);

export default router;
