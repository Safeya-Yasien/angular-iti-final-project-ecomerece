export interface Product {
  _id?: string;
  title: string;      
  slug?: string;
  description: string;
  price: number;
  priceAfterDiscount?: number; 
  quantity: number;      // بدل stock
  sold?: number;
  category: any;         
  imageCover: string;    // مهمة جداً لأنها Required في الباكيند
  images?: string[];
  ratingsAverage?: number;
  ratingsQuantity?: number;
  createdAt?: string;
  updatedAt?: string;
}