import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import Product from "../../models/Product";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectProducts, setProducts } from "../../redux/productsSlice";
import { ProductList } from "./ProductsList";

const resultsPerPage = 10;

export function ProductsTable() {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);

  const allProducts: Product[] = useAppSelector(selectProducts) || [];
  const products =
    allProducts.length <= resultsPerPage
      ? allProducts
      : allProducts.slice((page - 1) * 10, page * 10);

  useEffect(() => {
    async function getProducts() {
      try {
        const { data: products } = await api.get("/products");
        dispatch(setProducts(products));
      } catch (error) {
        console.error(error);
      }
    }

    getProducts();
  }, []);

  function getPaginationGroup() {
    const pageCount = Math.ceil(allProducts.length / resultsPerPage);

    return [...new Array(pageCount)].map((_, index) => index + 1);
  }

  function handleChangePage(page: number) {
    setPage(page);
  }

  return (
    <div>
      <table className="w-full h-min table-fixed border-collapse text-left">
        <thead className="pl-">
          <tr className="bg-slate-700 h-8 ">
            <th>Produto</th>
            <th>Data de fabricação</th>
            <th>Data de validade</th>
            <th>Preço</th>
            <th className="w-8"></th>
            <th className="w-8"></th>
          </tr>
        </thead>
        <tbody>
          <ProductList products={products} />
        </tbody>
      </table>
      {allProducts.length <= resultsPerPage ? (
        ""
      ) : (
        <div className="bg-green-500 flex justify-center gap-2">
          {page > 1 ? (
            <button onClick={() => handleChangePage(page - 1)}>{"<"}</button>
          ) : (
            ""
          )}

          {getPaginationGroup().map((currPage) => (
            <button
              key={currPage}
              onClick={() => handleChangePage(currPage)}
              disabled={currPage === page}
            >
              {currPage}
            </button>
          ))}

          {page < Math.ceil(allProducts.length / resultsPerPage) ? (
            <button onClick={() => handleChangePage(page + 1)}>{">"}</button>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
