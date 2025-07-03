import { createError } from "../utils/error.js";
import Conversation from "../models/Conversation.js";

export const createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    id: req.user.isOwner ? req.user.id + req.body.to : req.body.to + req.user.id, 
    ownerId: req.user.isOwner ? req.user.id : req.body.to,
    tenantId: req.user.isOwner ? req.body.to : req.user.id,
    readByOwner: req.user.isOwner,
    readByTenant: !req.user.isOwner,
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (err) {
    next(err);
  }
};

export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          readByOwner: true,
          readByTenant: true,
        },
      },
      { new: true }
    );

    res.status(200).send(updatedConversation);
  } catch (err) {
    next(err);
  }
};

export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) return next(createError(404, "Not found!"));
    res.status(200).send(conversation);
  } catch (err) {
    next(err);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.user.isOwner ? { ownerId: req.user.id } : { tenantId: req.user.id }
    ).sort({ updatedAt: -1 });
    res.status(200).send(conversations);
  } catch (err) {
    next(err);
  }
};
