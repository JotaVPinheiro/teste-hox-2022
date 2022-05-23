import { useState } from "react";
import { CircleNotch } from "phosphor-react";

import { api } from "../../lib/api";
import { useAppDispatch } from "../../redux/hooks";
import { addProduct } from "../../redux/productsSlice";

import Product from "../../models/Product";

const initialState = {
  name: "",
  manufacturedDate: "",
  perishable: false,
  expirationDate: "",
  price: 0,
};

export function CreateProductForm() {
  const [values, setValues] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  function onCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked, name } = event.target;
    setValues({ ...values, [name]: checked });
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  async function handleCreateProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const product = new Product(
        values.name,
        new Date(values.manufacturedDate),
        values.perishable,
        new Date(values.expirationDate),
        Number(values.price)
      );

      const {
        data: { id },
      } = await api.post("/products", product);
      product.id = id;

      dispatch(addProduct(product));
      setValues(initialState);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleCreateProduct}>
      <fieldset className="flex flex-col justify-center gap-2 p-10 w-96">
        <span className="flex justify-center text-3xl pb-6">
          Cadastrar produto
        </span>

        <div className="pb-2">
          <label className="text-sm" htmlFor="email">
            Nome do produto:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={onChange}
            required
            className="w-full rounded-lg ring-[1px] ring-gray-600 placeholder:text-gray-500 text-sm text-white p-2 bg-transparent hover:ring-gray-500 focus:ring-indigo-600 focus:ring-2 outline-none"
          />
        </div>

        <div>
          <label className="text-sm pr-2" htmlFor="manufacturedDate">
            Data de fabricação:
          </label>
          <input
            id="manufacturedDate"
            name="manufacturedDate"
            type="date"
            value={values.manufacturedDate}
            max={values.expirationDate}
            onChange={onChange}
            required
            className="rounded-lg ring-[1px] ring-gray-600 placeholder:text-gray-500 text-sm text-white p-2 bg-transparent hover:ring-gray-500 focus:ring-indigo-600 focus:ring-2 outline-none"
          />
        </div>

        <div className="flex items-center">
          <label className="text-sm pr-2" htmlFor="perishable">
            O produto é perecível?
          </label>
          <input
            id="perishable"
            name="perishable"
            type="checkbox"
            checked={values.perishable}
            onChange={onCheckboxChange}
            className="rounded focus:ring-[1px] focus:ring-indigo-600 outline-none"
          />
        </div>

        <div>
          <label className="text-sm pr-2" htmlFor="expirationDate">
            Data de vencimento:
          </label>
          <input
            id="expirationDate"
            name="expirationDate"
            type="date"
            value={values.expirationDate}
            min={values.manufacturedDate}
            onChange={onChange}
            required={values.perishable}
            disabled={!values.perishable}
            className="rounded-lg ring-[1px] ring-gray-600 placeholder:text-gray-500 text-sm text-white p-2 bg-transparent hover:ring-gray-500 focus:ring-indigo-600 focus:ring-2 outline-none disabled:ring-gray-700 disabled:text-gray-700 transition-colors"
          />
        </div>

        <div>
          <label className="text-sm" htmlFor="price">
            Preço:
          </label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Preço"
            value={values.price}
            min={0}
            step={0.01}
            onChange={onChange}
            required
            className="w-full rounded-lg ring-[1px] ring-gray-600 placeholder:text-gray-500 text-sm text-white p-2 bg-transparent hover:ring-gray-500 focus:ring-indigo-600 focus:ring-2 outline-none"
          />
        </div>

        <button
          type="submit"
          className="flex justify-center items-center mt-2 w h-12 rounded-lg bg-indigo-600 text-md shadow-md outline-none hover:bg-opacity-50 focus:bg-opacity-50 transition-colors"
        >
          {isLoading ? (
            <CircleNotch weight="bold" className="w-4 h-4 animate-spin" />
          ) : (
            "Cadastrar"
          )}
        </button>
      </fieldset>
    </form>
  );
}
