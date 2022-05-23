import { CaretLeft, CaretRight } from "phosphor-react";
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
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
      <table className="table table-fixed text-left w-full">
        <thead className="table-header-group bg-indigo-600 h-10">
          <tr className="table-row">
            <th scope="col" className="table-cell px-6">
              Produto
            </th>
            <th scope="col" className="table-cell w-44 px-6">
              Data de fabricação
            </th>
            <th scope="col" className="table-cell w-44 px-6">
              Data de validade
            </th>
            <th scope="col" className="table-cell w-32 px-6">
              Preço
            </th>
            <th scope="col" className="table-cell w-8 px-4"></th>
            <th scope="col" className="table-cell w-8 pr-8"></th>
          </tr>
        </thead>
        <tbody className="table-row-group">
          <ProductList products={products} />
        </tbody>
      </table>

      {allProducts.length <= resultsPerPage ? (
        ""
      ) : (
        <div className="bg-indigo-600 flex justify-center items-center gap-2">
          {page > 1 ? (
            <button onClick={() => handleChangePage(page - 1)}>
              <CaretLeft />
            </button>
          ) : (
            ""
          )}

          {getPaginationGroup().map((currPage) => (
            <button
              key={currPage}
              onClick={() => handleChangePage(currPage)}
              disabled={currPage === page}
              className="disabled:text-gray-400"
            >
              {currPage}
            </button>
          ))}

          {page < Math.ceil(allProducts.length / resultsPerPage) ? (
            <button onClick={() => handleChangePage(page + 1)}>
              <CaretRight />
            </button>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
