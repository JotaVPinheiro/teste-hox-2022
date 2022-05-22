import { useEffect } from "react";
import { api } from "../../lib/api";
import { ProductsTableItem } from "./ProductsTableItem";
import { selectProducts, setProducts } from "../../redux/productsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Product from "../../models/Product";

export function ProductList() {
  const products: Product[] = useAppSelector(selectProducts) || [];
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getProducts() {
      try {
        const { data: products } = await api.get("/products");
        dispatch(setProducts(products));
      } catch (error) {
        console.log(error);
      }
    }

    getProducts();
  }, []);

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
