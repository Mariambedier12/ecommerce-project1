export interface CartRes {
  status: string
  numOfCartItems: number;
  CartId: string
  data: Data
  totalCartPrice: number;

}

export interface Data {
  _id: string
  cartOwner: string
  products: Product[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface Product {
  count: number
  _id: string
  product: Product2
  price: number
}

export interface Product2 {
  subCategory: string[]
  _id: string
  title: string
  quantity: number
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  price: number
  id: string
}

export interface SubCategory {
  _id: string
  name: string
  slug: string
  image: string
  category: string
}


export interface Category {
  _id: string
  name: string
  slug: string
  image: string
}

export interface Brand {
  _id: string
  name: string
  slug: string
  image: string

}

export interface CartActionResponse {
  status: string;
  message: string;
}
