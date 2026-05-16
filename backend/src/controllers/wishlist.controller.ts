import Product from "../models/Product.model";
import Wishlist from "../models/Wishlist.model";

const add = async (req: any, res: any, next: any) => {
  const { productId } = req.body;
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user._id,
        wishlistItems: [
          {
            product: product._id,
          },
        ],
      });
    } else {
      const itemIndex = wishlist.wishlistItems.findIndex(
        (item) => item.product.toString() === product._id.toString(),
      );

      if (itemIndex > -1) {
        wishlist.wishlistItems.splice(itemIndex, 1);
      } else {
        wishlist.wishlistItems.push({
          product: product._id,
          addedAt: new Date(),
        });
      }
    }

    await wishlist.save();

    const populated = await wishlist.populate(
      "wishlistItems.product",
      "title imageCover price quantity",
    );

    res.status(201).json({
      status: "success",
      data: populated,
    });
  } catch (err) {
    next(err);
  }
};

const getAll = async (req: any, res: any, next: any) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
      "wishlistItems.product",
      "title imageCover price",
    );

    if (!wishlist) {
      return res.status(404).json({
        message: "You have no wishlist",
      });
    }

    res.status(200).json({
      status: "success",
      data: wishlist,
    });
  } catch (err) {
    next(err);
  }
};

const clear = async (req: any, res: any, next: any) => {
  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: req.user._id },
      {
        wishlistItems: [],
      },
      {
        returnDocument: "after",
      },
    );

    if (!wishlist) {
      return res.status(404).json({
        status: "error",
        message: "Wishlist not found for this user",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Wishlist items cleared successfully",
      data: wishlist,
    });
  } catch (err) {
    next(err);
  }
};

const remove = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "Product Id is required",
      });
    }
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(404).json({
        status: "error",
        message: "Wishlist not found for this user",
      });
    }

    const itemIndex = wishlist.wishlistItems.findIndex(
      (item) => item.product.toString() === product._id.toString(),
    );

    if (itemIndex > -1) {
      wishlist.wishlistItems.splice(itemIndex, 1);
    } else {
      return res.status(404).json({
        status: "error",
        message: "Product not found in wishlist",
      });
    }

    await wishlist.save();

    const populated = await wishlist.populate(
      "wishlistItems.product",
      "title imageCover price quantity",
    );

    res.status(200).json({
      status: "success",
      message: "Product removed from wishlist",
      data: populated,
    });
  } catch (err) {
    next(err);
  }
};

export { add, getAll, clear, remove };
