export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageCover: string;
  ratingsQuantity: number;
  ratingsAverage?: number;
  quantity: number;
}

export interface ApiResponse {
  status: string;
  count: number;
  data: Product[];
}
