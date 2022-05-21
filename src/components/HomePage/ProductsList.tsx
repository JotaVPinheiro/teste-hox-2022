import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { ProductsTableItem } from "./ProductsTableItem";

export function ProductList() {
  const [products, setProducts] = useState([
    {
      name: "",
      manufacturedDate: "",
      perishable: true,
      expirationDate: "",
      price: 0,
      id: 0,
    },
  ]);

  useEffect(() => {
    async function getProducts() {
      try {
        const { data: products } = await api.get("/products");
        console.log("products: ", products);
        setProducts(products);
      } catch (error) {
        console.log(error);
      }
    }

    getProducts();
  }, []);

  return (
    <>
      {products.map((product) => (
        <ProductsTableItem
          key={product.id}
          productId={product.id}
          name={product.name}
          manufacturedDate={new Date(product.manufacturedDate)}
          perishable={product.perishable}
          expirationDate={new Date(product.expirationDate)}
          price={Number(product.price)}
        />
      ))}
    </>
  );
}
