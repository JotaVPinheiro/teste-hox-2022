import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Product from "../models/Product";
import { RootState } from "./store";

const initialState: Product[] = [];

export const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, { payload }: PayloadAction<Product[]>) => {
      state.length = 0;
      state.push(...payload);
    },
    addProduct: (state, { payload }: PayloadAction<Product>) => {
      state.push(payload);
    },
    updateProduct: (state, { payload }: PayloadAction<Product>) => {
      const { id, name, manufacturedDate, perishable, expirationDate, price } =
        payload;

      const index = state.findIndex((product) => product.id === id);
      state.splice(index, 1, {
        name,
        manufacturedDate,
        perishable,
        expirationDate,
        price,
        id,
      });
    },
    deleteProduct: (state, { payload: id }: PayloadAction<number>) => {
      const index = state.findIndex((product) => product.id === id);
      state.splice(index, 1);
    },
  },
});

export const { setProducts, addProduct, updateProduct, deleteProduct } =
  slice.actions;

export const selectProducts = (state: RootState) => state.products;

export default slice.reducer;
