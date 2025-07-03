import express from "express";

import { verifyToken } from "../utils/verifyToken.js";
import { createReview, deleteReview, getReviews } from "../controllerss/review.controller.js";

const router = express.Router();

router.post("/",verifyToken, createReview )
router.get("/:houseId", getReviews )
router.delete("/:id", deleteReview)

export default router;
