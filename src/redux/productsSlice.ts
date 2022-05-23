import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Product from "../models/Product";
import { OrderProductsFunction } from "../utils/orderProducts";
import { RootState } from "./store";

interface ProductsSlice {
  data: Product[];
  dataLength: number;
  order: OrderProductsFunction;
  resultsPerPage: number;
  page: number;
}

const initialState: ProductsSlice = {
  data: [],
  dataLength: 1,
  order: (product: Product, product_: Product) => 0,
  resultsPerPage: 10,
  page: 1,
};

export const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, { payload }: PayloadAction<Product[]>) => {
      state.data.length = 0;
      state.data.push(...payload);
      state.dataLength = state.data.length;
    },
    addProduct: (state, { payload }: PayloadAction<Product>) => {
      state.data.push(payload);
      state.dataLength++;
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
      state.dataLength--;
    },
    setProductsOrder: (
      state,
      { payload: order }: PayloadAction<OrderProductsFunction>
    ) => {
      state.order = order;
    },
    setPage: (state, { payload: page }: PayloadAction<number>) => {
      state.page = page;
    },
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  setProductsOrder,
  setPage,
} = slice.actions;

export const selectProducts = (state: RootState) => state.products;

export default slice.reducer;
