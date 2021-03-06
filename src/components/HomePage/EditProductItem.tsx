import { useState } from "react";
import { FloppyDisk } from "phosphor-react";

import { api } from "../../lib/api";
import { useAppDispatch } from "../../redux/hooks";
import { updateProduct } from "../../redux/productsSlice";

import Product from "../../models/Product";

export function EditProductItem({
  id,
  name,
  manufacturedDate,
  perishable,
  expirationDate,
  price,
}: Product) {
  const initialState = {
    name,
    manufacturedDate: formatDate(manufacturedDate),
    perishable,
    expirationDate: formatDate(expirationDate || ""),
    price,
  };

  const [values, setValues] = useState(initialState);
  const [isEditing, setIsEditing] = useState(true);

  const dispatch = useAppDispatch();

  async function handleEditProduct() {
    try {
      const product = new Product(
        values.name,
        new Date(values.manufacturedDate),
        values.perishable,
        new Date(values.expirationDate || ""),
        Number(values.price)
      );
      product.id = id;

      await api.put(`/products/${id}`, product);
      dispatch(updateProduct(product));
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  function formatDate(date: Date | string): string | number {
    if (typeof date === "string") {
      date = new Date(date);
      date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    }

    const day = date.getDate();
    const month = date.getMonth() + 1;

    const formatedDate = [
      date.getFullYear(),
      month >= 10 ? month : "0" + month,
      day >= 10 ? day : "0" + day,
    ];

    return formatedDate.join("-");
  }

  return (
    <>
      {isEditing ? (
        <tr className="table-row bg-gray-900">
          <td className="table-cell px-6 py-2">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Nome do produto"
              value={values.name}
              onChange={onChange}
              className="w-full bg-transparent border-b"
            />
          </td>

          <td className="table-cell px-6">
            <input
              id="manufacturedDate"
              name="manufacturedDate"
              type="date"
              value={values.manufacturedDate}
              max={values.expirationDate ? values.expirationDate : undefined}
              onChange={onChange}
              className="w-[8.5rem] bg-transparent border-b"
            />
          </td>

          <td className="table-cell px-6">
            {perishable ? (
              <input
                id="expirationDate"
                name="expirationDate"
                type="date"
                value={
                  values.expirationDate ? values.expirationDate : undefined
                }
                min={values.manufacturedDate}
                onChange={onChange}
                className="w-[8.5rem] bg-transparent border-b"
              />
            ) : (
              "-"
            )}
          </td>

          <td className="table-cell px-6">
            <input
              id="price"
              name="price"
              type="number"
              placeholder="Pre??o"
              value={values.price}
              min={0}
              step={0.01}
              onChange={onChange}
              className="w-14 bg-transparent border-b"
            />
          </td>

          <td className="table-cell px-3">
            <button>
              <FloppyDisk
                onClick={handleEditProduct}
                className="hover:text-indigo-400 transition-colors"
              />
            </button>
          </td>

          <td></td>
        </tr>
      ) : (
        ""
      )}
    </>
  );
}
