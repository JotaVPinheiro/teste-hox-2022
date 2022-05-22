import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../lib/api";
import { ProductsTableItem } from "./ProductsTableItem";
import { selectProducts, setProducts } from "../../redux/productsSlice";

interface Product {
  id: number;
  name: string;
  manufacturedDate: string;
  perishable: boolean;
  expirationDate: string;
  price: number;
}

export function ProductList() {
  const products: Product[] = useSelector(selectProducts) || [];
  const dispatch = useDispatch();

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
              productId={product.id}
              name={product.name}
              manufacturedDate={product.manufacturedDate}
              perishable={product.perishable}
              expirationDate={product.expirationDate}
              price={Number(product.price)}
            />
          ))}
    </>
  );
}
