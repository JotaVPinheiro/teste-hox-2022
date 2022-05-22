import { FloppyDisk } from "phosphor-react";
import { useState } from "react";
import { api } from "../../lib/api";

import { ProductProps } from "./ProductsTableItem";

export function EditProductItem({
  productId,
  name,
  manufacturedDate,
  perishable,
  expirationDate,
  price,
}: ProductProps) {
  const initialState = {
    name,
    manufacturedDate,
    perishable,
    expirationDate,
    price,
  };

  const [values, setValues] = useState(initialState);

  async function handleEditProduct() {
    console.log(values);
    try {
      await api.patch(`/products/${productId}`, values);
    } catch (error) {
      console.log(error);
    }
  }

  function onChange(event: any) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  return (
    <tr className="bg-slate-700 h-8 ">
      <td>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Nome do produto"
          value={values.name}
          onChange={onChange}
        />
      </td>
      <td>
        <input
          id="manufacturedDate"
          name="manufacturedDate"
          type="date"
          value={values.manufacturedDate}
          max={values.expirationDate}
          onChange={onChange}
        />
      </td>
      <td>
        {perishable ? (
          <input
            id="expirationDate"
            name="expirationDate"
            type="date"
            value={values.expirationDate}
            min={values.manufacturedDate}
            onChange={onChange}
          />
        ) : (
          "-"
        )}
      </td>
      <td>
        <input
          id="price"
          name="price"
          type="number"
          placeholder="Preço"
          value={values.price}
          min={0}
          onChange={onChange}
        />
      </td>
      <td>
        <button>
          <FloppyDisk
            onClick={handleEditProduct}
            className="hover:text-blue-400"
          />
        </button>
      </td>
      <td></td>
    </tr>
  );
}
