
import Order from "../models/Book.js";
import Houses from "../models/Houses.js";
export const createOrder = async (req, res, next) => {

  const book = await Houses.findById(req.params.id);

  const newOrder = new Order({
    houseId: book._id,
    img: book.house_Image,
    title: book.title,
    tenantId: req.user.id,
    ownerId: book.userId,
    price: book.price,
    isCompleted:true
  });

  await newOrder.save();

  res.status(200).send("Successful");
};

export const getOrders = async (req, res, next) => {
    try {
      const orders = await Order.find({
        ...(req.isOwner ? { ownerId: req.user.id } : { tenantId: req.user.id }),
        isCompleted: true,
      });
  
      res.status(200).send(orders);
    } catch (err) {
      next(err);
    }
  };