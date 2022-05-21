import { Pen, Trash } from "phosphor-react";

interface ProductProps {
  name: string;
  manufacturedDate: Date;
  perishable: boolean
  expirationDate: Date | null;
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
  function formatDate(date: Date | null): string {
    if (date == null) return "-";

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
    <tr className="bg-slate-600 h-8">
      <td>{name}</td>
      <td>{formatDate(manufacturedDate)}</td>
      <td>{perishable ? formatDate(expirationDate) : '-'}</td>
      <td>{formatPrice(price)}</td>
      <td>
        <button className="hover:text-blue-400">
          <Pen />
        </button>
      </td>
      <td>
        <button className="hover:text-red-400">
          <Trash />
        </button>
      </td>
    </tr>
  );
}
