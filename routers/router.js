import express from "express";

import {
  getRoot,
  getProducts,
  getProductsByID,
  getInsertData,
  postSignin,
} from "./partials.js";

const router = express.Router();

router.get("/", getRoot);
router.get("/products", getProducts);
router.get("/products/:id", getProductsByID);
router.get("/insertData", getInsertData);

router.post("/signin", postSignin);

export default router;
