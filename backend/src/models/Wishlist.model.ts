import mongoose from "mongoose";

export interface IWishlistItem {
  product: mongoose.Types.ObjectId;
  addedAt: Date;
}

export interface IWishlist {
  wishlistItems: IWishlistItem[];
  user: mongoose.Types.ObjectId;
}

const wishlistSchema = new mongoose.Schema<IWishlist>(
  {
    wishlistItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Wishlist must belong to a user"],
      unique: true,
    },
  },
  { timestamps: true },
);

const Wishlist = mongoose.model<IWishlist>("Wishlist", wishlistSchema);
export default Wishlist;
