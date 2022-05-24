import { CaretLeft, CaretRight, CaretUp, CaretDown } from "phosphor-react";
import { useEffect, useState } from "react";

import { api } from "../../lib/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectProducts,
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

  const { dataLength: allProductsCount } = useAppSelector(selectProducts);
  const { order: currentOrder } = useAppSelector(selectProducts);
  const { resultsPerPage } = useAppSelector(selectProducts);
  const { page: currentPage } = useAppSelector(selectProducts);

  const [orderType, setOrderType] = useState("");

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
      setOrderType(order + "Desc");
      return;
    }

    setOrderType(order);
    dispatch(setProductsOrder(selectedOrder));
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
      <table className="table text-left">
        <thead className="table-header-group bg-indigo-600">
          <tr className="table-row">
            <th scope="col" className="table-cell py-2 px-6">
              <button
                className="flex items-center hover:text-gray-400"
                onClick={() => handleOrderProducts("byName", currentOrder)}
              >
                Produto
                {orderType === "byName" ? <CaretUp className="pl-1" /> : ""}
                {orderType === "byNameDesc" ? (
                  <CaretDown className="pl-1" />
                ) : (
                  ""
                )}
              </button>
            </th>

            <th scope="col" className="table-cell px-6">
              <button
                className="w-max flex items-center hover:text-gray-400"
                onClick={() =>
                  handleOrderProducts("byManufacturedDate", currentOrder)
                }
              >
                Data de fabricação
                {orderType === "byManufacturedDate" ? (
                  <CaretUp className="pl-1" />
                ) : (
                  ""
                )}
                {orderType === "byManufacturedDateDesc" ? (
                  <CaretDown className="pl-1" />
                ) : (
                  ""
                )}
              </button>
            </th>

            <th scope="col" className="table-cell px-6">
              <button
                className="w-max flex items-center hover:text-gray-400"
                onClick={() =>
                  handleOrderProducts("byExpirationDate", currentOrder)
                }
              >
                Data de vencimento
                {orderType === "byExpirationDate" ? (
                  <CaretUp className="pl-1" />
                ) : (
                  ""
                )}
                {orderType === "byExpirationDateDesc" ? (
                  <CaretDown className="pl-1" />
                ) : (
                  ""
                )}
              </button>
            </th>

            <th scope="col" className="table-cell px-6">
              <button
                className="flex items-center hover:text-gray-400"
                onClick={() => handleOrderProducts("byPrice", currentOrder)}
              >
                Preço
                {orderType === "byPrice" ? <CaretUp className="pl-1" /> : ""}
                {orderType === "byPriceDesc" ? (
                  <CaretDown className="pl-1" />
                ) : (
                  ""
                )}
              </button>
            </th>

            <th scope="col" className="table-cell px-3"></th>

            <th scope="col" className="table-cell px-3"></th>
          </tr>
        </thead>
        <tbody className="table-row-group">
          <ProductList />
        </tbody>
      </table>

      {allProductsCount <= resultsPerPage ? (
        ""
      ) : (
        <div className="bg-indigo-600 flex justify-center items-center py-2 gap-2">
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
