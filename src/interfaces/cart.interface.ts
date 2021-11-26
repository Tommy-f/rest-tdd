// import Users from './'

export interface ICart {
  products: ICartProduct[];
}

export interface ICartProduct {
  productId: string;
  amount: number;
}

// export interface ICart extends Array<ICartItem> {}

// export interface ICart {
//   [index: number]: ICartItem;
// }
