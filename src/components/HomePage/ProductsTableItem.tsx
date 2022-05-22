import { Pen, Trash, XCircle } from "phosphor-react";
import { useState } from "react";
import { api } from "../../lib/api";
import { EditProductItem } from "./EditProductItem";

export interface ProductProps {
  name: string;
  manufacturedDate: string;
  perishable: boolean;
  expirationDate: string;
  price: number;
  productId: number;
}

export function ProductsTableItem({
  productId,
  name,
  manufacturedDate,
  perishable,
  expirationDate,
  price,
}: ProductProps) {
  const [isEditing, setIsEditing] = useState(false);

  async function handleDeleteProduct() {
    await api.delete(`/products/${productId}`);
  }

  function handleEditProduct() {
    setIsEditing(!isEditing);
  }

  function formatDate(date: Date | string): string {
    if (typeof date == 'string')
      date = new Date(date)

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
        <td>{perishable ? formatDate(expirationDate) : "-"}</td>
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
          key={productId}
          productId={productId}
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
