import { Pen, Trash, XCircle } from "phosphor-react";
import { useState } from "react";
import { api } from "../../lib/api";
import Product from "../../models/Product";
import { useAppDispatch } from "../../redux/hooks";
import { EditProductItem } from "./EditProductItem";
import { deleteProduct } from "../../redux/productsSlice";

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
      console.log(id);
      await api.delete(`/products/${id}`);
      dispatch(deleteProduct(id as number));
    } catch (error) {
      console.log(error);
    }
  }

  function handleEditProduct() {
    setIsEditing(!isEditing);
  }

  function formatDate(date: Date | string): string {
    if (typeof date === "string") date = new Date(date);

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
      <tr className="bg-slate-600 h-8">
        <td>{name}</td>
        <td>{formatDate(manufacturedDate)}</td>
        <td>{perishable ? formatDate(expirationDate as Date) : "-"}</td>
        <td>{formatPrice(price)}</td>
        <td>
          <button onClick={handleEditProduct}>
            {isEditing ? (
              <XCircle className="hover:text-red-400" />
            ) : (
              <Pen className="hover:text-blue-400" />
            )}
          </button>
        </td>
        <td>
          <button onClick={handleDeleteProduct} className="hover:text-red-400">
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
