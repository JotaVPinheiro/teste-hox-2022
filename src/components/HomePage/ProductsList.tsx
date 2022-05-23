import Product from "../../models/Product";
import { useAppSelector } from "../../redux/hooks";
import { selectOrder, selectProducts } from "../../redux/productsSlice";

import { ProductsTableItem } from "./ProductsTableItem";

export function ProductList() {
  const products = [...useAppSelector(selectProducts)] || [];
  const currentOrder = useAppSelector(selectOrder);
  products.sort(currentOrder);

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
