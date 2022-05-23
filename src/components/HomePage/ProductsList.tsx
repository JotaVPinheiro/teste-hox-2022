import Product from "../../models/Product";
import { useAppSelector } from "../../redux/hooks";
import { selectProducts } from "../../redux/productsSlice";

import { ProductsTableItem } from "./ProductsTableItem";

export function ProductList() {
  const { data } = useAppSelector(selectProducts);
  const allProducts = [...data];
  const { order: currentOrder } = useAppSelector(selectProducts);
  const { page: currentPage } = useAppSelector(selectProducts);
  const { resultsPerPage } = useAppSelector(selectProducts);

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
