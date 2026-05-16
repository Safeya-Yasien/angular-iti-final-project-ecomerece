enum Status {
  Success = 'success',
  Error = 'error',
}

interface IProduct {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
}

interface IWishlistItem {
  product: IProduct;
}

export interface IWishlist {
  _id: string;
  wishlistItems: IWishlistItem[];
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface IWishlistResponse {
  status: Status;
  data: IWishlist | null;
}
