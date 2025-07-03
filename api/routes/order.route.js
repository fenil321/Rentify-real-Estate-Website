import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {createOrder, getOrders } from "../controllerss/order.controller.js";

const router = express.Router();

router.post("/:id", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);

export default router;
