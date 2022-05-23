import { CaretLeft, CaretRight } from "phosphor-react";
import { useEffect, useState } from "react";

import { api } from "../../lib/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectOrder,
  selectPage,
  selectProductsCount,
  selectResultsPerPage,
  setPage,
  setProducts,
  setProductsOrder,
} from "../../redux/productsSlice";
import {
  OrderProducts,
  OrderProductsDesc,
  OrderProductsFunction,
  OrderProductsOption,
} from "../../utils/orderProducts";

import { ProductList } from "./ProductsList";

export function ProductsTable() {
  const dispatch = useAppDispatch();

  const allProductsCount = useAppSelector(selectProductsCount) || 0;
  const currentOrder = useAppSelector(selectOrder);
  const resultsPerPage = useAppSelector(selectResultsPerPage);
  const currentPage = useAppSelector(selectPage) || 1;

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
    const pageCount = Math.ceil(allProductsCount / resultsPerPage);
    return [...new Array(pageCount)].map((_, index) => index + 1);
  }

  function handleChangePage(page: number) {
    dispatch(setPage(page));
  }

  function handleOrderProducts(
    order: OrderProductsOption,
    currentOrder: OrderProductsFunction
  ) {
    const selectedOrder = OrderProducts[order];
    const selectedOrderDesc = OrderProductsDesc[order];

    if (selectedOrder === currentOrder) {
      dispatch(setProductsOrder(selectedOrderDesc));
      return;
    }

    dispatch(setProductsOrder(selectedOrder));
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
      <table className="table table-fixed text-left w-full">
        <thead className="table-header-group bg-indigo-600 h-10">
          <tr className="table-row">
            <th scope="col" className="table-cell px-6">
              <button
                onClick={() => handleOrderProducts("byName", currentOrder)}
              >
                Produto
              </button>
            </th>
            <th scope="col" className="table-cell w-44 px-6">
              <button
                onClick={() =>
                  handleOrderProducts("byManufacturedDate", currentOrder)
                }
              >
                Data de fabricação
              </button>
            </th>
            <th scope="col" className="table-cell w-44 px-6">
              <button
                onClick={() =>
                  handleOrderProducts("byExpirationDate", currentOrder)
                }
              >
                Data de vencimento
              </button>
            </th>
            <th scope="col" className="table-cell w-32 px-6">
              <button
                onClick={() => handleOrderProducts("byPrice", currentOrder)}
              >
                Preço
              </button>
            </th>
            <th scope="col" className="table-cell w-8 px-4"></th>
            <th scope="col" className="table-cell w-8 pr-8"></th>
          </tr>
        </thead>
        <tbody className="table-row-group">
          <ProductList />
        </tbody>
      </table>

      {allProductsCount <= resultsPerPage ? (
        ""
      ) : (
        <div className="bg-indigo-600 flex justify-center items-center gap-2">
          {currentPage > 1 ? (
            <button onClick={() => handleChangePage(currentPage - 1)}>
              <CaretLeft />
            </button>
          ) : (
            ""
          )}

          {getPaginationGroup().map((page) => (
            <button
              key={page}
              onClick={() => handleChangePage(page)}
              disabled={page === currentPage}
              className="disabled:text-gray-400"
            >
              {page}
            </button>
          ))}

          {currentPage < Math.ceil(allProductsCount / resultsPerPage) ? (
            <button onClick={() => handleChangePage(currentPage + 1)}>
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
