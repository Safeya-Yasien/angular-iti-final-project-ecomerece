import Order from "../models/Order.model";
import { handleImageUpload } from "../utils/processProductImages";

const getAll = async (req: any, res: any, next: any) => {
  try {
    const products = await Product.find({}).populate({
      path: "category",
      select: "title",
    });

    res.status(200).json({
      status: "success",
      count: products.length,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

const cancel = async (req: any, res: any, next: any) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "id is required",
      });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export { getAll, cancel };
