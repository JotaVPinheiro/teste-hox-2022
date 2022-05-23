import Product from "../../models/Product";
import { useAppSelector } from "../../redux/hooks";
import {
  selectOrder,
  selectPage,
  selectProducts,
  selectResultsPerPage,
} from "../../redux/productsSlice";

import { ProductsTableItem } from "./ProductsTableItem";

export function ProductList() {
  const allProducts = [...useAppSelector(selectProducts)] || [];
  const currentOrder = useAppSelector(selectOrder);
  const currentPage = useAppSelector(selectPage);
  const resultsPerPage = useAppSelector(selectResultsPerPage);

  allProducts.sort(currentOrder);

  const products =
    allProducts.length > resultsPerPage
      ? allProducts.slice((currentPage - 1) * 10, currentPage * 10)
      : allProducts;

  return (
    <>
      {products == []
        ? ""
        : products.map((product: Product) => (
            <ProductsTableItem
              key={product.id}
              id={product.id}
              name={product.name}
              manufacturedDate={product.manufacturedDate}
              perishable={product.perishable}
              expirationDate={product.expirationDate}
              price={product.price}
            />
          ))}
    </>
  );
}
