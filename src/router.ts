import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./module/middleware";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./handlers/products";
import {
  getUpdates,
  getUpdateById
} from './handlers/update'

const router = Router();

//Products
router
  .get("/product", getProducts)
  .get("/product/:id", getProductById)
  .put(
    "/product/:id",
    body("name").isString(),
    handleInputErrors,
    updateProduct
  )
  .delete("/product/:id", deleteProduct)
  .post("/product", body("name").isString(), handleInputErrors, addProduct);

//Updates
router
  .get("/update", getUpdates)
  .get("/update/:id", getUpdateById)
  .put(
    "/update/:id",
    body("title").optional(),
    body("body").optional(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "CANCELLED"]),
    body("version").optional(),
    handleInputErrors,
    async (req, res) => {}
  )
  .delete("/update/:id", async (req, res) => {})
  .post(
    "/update",
    body("title").exists().isString(),
    body("body").exists().isString(),
    handleInputErrors,
    async (req, res) => {}
  );

//UpdatePoints
router
  .get("/udpatepoint", async (req, res) => {})
  .get("/udpatepoint/:id", async (req, res) => {})
  .put(
    "/udpatepoint/:id",
    body("name").optional().isString(),
    body("description").optional().isString(),
    handleInputErrors,
    async (req, res) => {}
  )
  .delete("/udpatepoint/:id", async (req, res) => {})
  .post(
    "/udpatepoint",
    body("name").isString(),
    body("description").isString(),
    body("updateId").exists().isString(),
    handleInputErrors,
    async (req, res) => {}
  );

export default router;
