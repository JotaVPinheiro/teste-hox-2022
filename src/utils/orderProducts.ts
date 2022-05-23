import Product from "../models/Product";

export type OrderProductsFunction = (
  product: Product,
  product_: Product
) => number;

export type OrderProductsOption =
  | "byName"
  | "byManufacturedDate"
  | "byExpirationDate"
  | "byPrice";

export const OrderProducts = {
  byName(product: Product, product_: Product) {
    return product.name.localeCompare(product_.name);
  },

  byPrice(product: Product, product_: Product) {
    return product.price - product_.price;
  },

  byManufacturedDate(product: Product, product_: Product) {
    if (product.manufacturedDate < product_.manufacturedDate) return -1;
    if (product.manufacturedDate > product_.manufacturedDate) return 1;
    return 0;
  },

  byExpirationDate(product: Product, product_: Product) {
    if (!product.expirationDate) return -1;
    if (!product_.expirationDate) return 1;
    if (product.expirationDate < product_.expirationDate) return -1;
    if (product.expirationDate > product_.expirationDate) return 1;
    return 0;
  },
};

export const OrderProductsDesc = {
  byName(product: Product, product_: Product) {
    return -product.name.localeCompare(product_.name);
  },

  byPrice(product: Product, product_: Product) {
    return product_.price - product.price;
  },

  byManufacturedDate(product: Product, product_: Product) {
    if (product.manufacturedDate < product_.manufacturedDate) return 1;
    if (product.manufacturedDate > product_.manufacturedDate) return -1;
    return 0;
  },

  byExpirationDate(product: Product, product_: Product) {
    if (!product.expirationDate) return 1;
    if (!product_.expirationDate) return -1;
    if (product.expirationDate < product_.expirationDate) return 1;
    if (product.expirationDate > product_.expirationDate) return -1;
    return 0;
  },
};