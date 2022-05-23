import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Product from "../models/Product";
import { OrderProductsFunction, OrderProducts } from "../utils/orderProducts";
import { RootState } from "./store";

interface ProductsSlice {
  data: Product[];
  order: OrderProductsFunction;
}

const initialState: ProductsSlice = {
  data: [],
  order: (product: Product, product_: Product) => 0,
};

export const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, { payload }: PayloadAction<Product[]>) => {
      state.data.length = 0;
      state.data.push(...payload);
    },
    addProduct: (state, { payload }: PayloadAction<Product>) => {
      state.data.push(payload);
    },
    updateProduct: (state, { payload }: PayloadAction<Product>) => {
      const { id, name, manufacturedDate, perishable, expirationDate, price } =
        payload;

      const index = state.data.findIndex((product) => product.id === id);
      state.data.splice(index, 1, {
        name,
        manufacturedDate,
        perishable,
        expirationDate,
        price,
        id,
      });
    },
    deleteProduct: (state, { payload: id }: PayloadAction<number>) => {
      const index = state.data.findIndex((product) => product.id === id);
      state.data.splice(index, 1);
    },
    setProductsOrder: (
      state,
      { payload: order }: PayloadAction<OrderProductsFunction>
    ) => {
      state.order = order;
    },
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  setProductsOrder,
} = slice.actions;

export const selectProducts = (state: RootState) => state.products.data;
export const selectProductsCount = (state: RootState) =>
  state.products.data.length;
export const selectOrder = (state: RootState) => state.products.order;

export default slice.reducer;
