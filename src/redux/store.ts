import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import productsReducer from "./productsSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "products/updateProduct",
          "products/addProduct",
          "products/setProductsOrder",
        ],
        ignoredPaths: ["products"],
      },
    }),
});

export { store };
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
