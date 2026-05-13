import authRoute from "./auth.route";
import productsRoute from "./product.route";
import usersRoute from "./user.route";
import categoriesRoute from "./category.route";
import cartRoute from "./cart.route";
import ordersRoute from "./order.route";
import wishlistRoute from "./wishlist.route";
import { Router } from "express";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", usersRoute);
router.use("/products", productsRoute);
router.use("/categories", categoriesRoute);
router.use("/cart", cartRoute);
router.use("/orders", ordersRoute);
router.use("/wishlist", wishlistRoute);

export default router;
