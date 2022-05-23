import Product from "../../models/Product";

import { ProductsTableItem } from "./ProductsTableItem";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
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
