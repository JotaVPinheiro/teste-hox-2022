import { useState } from "react";
import { Pen, Trash, XCircle } from "phosphor-react";

import { api } from "../../lib/api";
import { useAppDispatch } from "../../redux/hooks";
import { deleteProduct } from "../../redux/productsSlice";
import Product from "../../models/Product";

import { EditProductItem } from "./EditProductItem";

export function ProductsTableItem({
  id,
  name,
  manufacturedDate,
  perishable,
  expirationDate,
  price,
}: Product) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();

  async function handleDeleteProduct() {
    try {
      await api.delete(`/products/${id}`);
      dispatch(deleteProduct(id as number));
    } catch (error) {
      console.error(error);
    }
  }

  function handleEditProduct() {
    setIsEditing(!isEditing);
  }

  function formatDate(date: Date | string): string {
    if (typeof date === "string") {
      date = new Date(date);
      date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    }

    const day = date.getDate();
    const month = date.getMonth() + 1;

    const formatedDate = [
      day >= 10 ? day : "0" + day,
      month >= 10 ? month : "0" + month,
      date.getFullYear(),
    ];

    return formatedDate.join("/");
  }

  function formatPrice(price: number): string {
    const integerPart = Math.trunc(price);
    const decimalPart = Math.trunc((price - Math.trunc(price)) * 100);

    const formatedPrice = [
      "R$ ",
      integerPart,
      ",",
      decimalPart >= 10 ? decimalPart : "0" + decimalPart,
    ];

    return formatedPrice.join("");
  }

  return (
    <>
      <tr className="table-row border-b border-gray-600 hover:bg-gray-700 last-of-type:border-none">
        <td className="table-cell break-words px-6 py-2">{name}</td>

        <td className="table-cell px-6">{formatDate(manufacturedDate)}</td>

        <td className="table-cell px-6">
          {perishable ? formatDate(expirationDate as Date) : "-"}
        </td>

        <td className="table-cell px-6 break-words">{formatPrice(price)}</td>

        <td className="table-cell px-3">
          <button onClick={handleEditProduct}>
            {isEditing ? (
              <XCircle className="hover:text-red-400 transition-colors" />
            ) : (
              <Pen className="hover:text-indigo-400 transition-colors" />
            )}
          </button>
        </td>

        <td className="table-cell px-3">
          <button
            onClick={handleDeleteProduct}
            className="hover:text-red-400 transition-colors"
          >
            <Trash />
          </button>
        </td>
      </tr>

      {isEditing ? (
        <EditProductItem
          key={id}
          id={id}
          name={name}
          manufacturedDate={manufacturedDate}
          perishable={perishable}
          expirationDate={expirationDate}
          price={Number(price)}
        />
      ) : (
        ""
      )}
    </>
  );
}
