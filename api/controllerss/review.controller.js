import Review from "../models/review.models.js";
import Houses from "../models/Houses.js";
import { createError } from "../utils/error.js";

export const createReview = async (req, res, next) => {
  // if (req.user.isOwner)
  //   return next(createError(403, "Owner's can't create a review!"));

  const newReview = new Review({
    userId: req.user.id,
    houseId: req.body.houseId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
        houseId: req.body.houseId,
      userId: req.userId,
    });

    if (review)
      return next(
        createError(403, "You have already created a review for this property!")
      );

    const savedReview = await newReview.save();

    await Houses.findByIdAndUpdate(req.body.houseId, {
      $inc: { totalStars: req.body.star, ratings: 1 },
    });
    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ houseId: req.params.houseId });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
