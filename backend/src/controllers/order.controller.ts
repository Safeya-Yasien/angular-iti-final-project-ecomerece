import Order from "../models/Order.model";

const getAll = async (req: any, res: any, next: any) => {
  try {
    const orders = await Order.find({});

    res.status(200).json({
      status: "success",
      count: orders.length,
      data: orders,
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

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Order deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export { getAll, cancel };
