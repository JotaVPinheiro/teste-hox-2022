import { useState } from "react";
import { api } from "../../lib/api";
import Product from "../../models/Product";
import { useAppDispatch } from "../../redux/hooks";
import { addProduct } from "../../redux/productsSlice";

const initialState = {
  name: "",
  manufacturedDate: "",
  perishable: false,
  expirationDate: "",
  price: 0,
};

export function CreateProductForm() {
  const [values, setValues] = useState(initialState);
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
    try {
      const product = new Product(
        values.name,
        new Date(values.manufacturedDate),
        values.perishable,
        new Date(values.expirationDate),
        Number(values.price)
      );

      const { data: { id } } = await api.post("/products", product);
      product.id = id

      dispatch(addProduct(product));
      setValues(initialState);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleCreateProduct}>
      <fieldset className="flex flex-col justify-center gap-3 p-10">
        <span className="flex justify-center text-3xl pb-6">
          Cadastrar produto
        </span>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Nome do produto"
          value={values.name}
          onChange={onChange}
          required
        />
        <label htmlFor="manufacturedDate">Data de fabricação</label>
        <input
          id="manufacturedDate"
          name="manufacturedDate"
          type="date"
          value={values.manufacturedDate}
          max={values.expirationDate}
          onChange={onChange}
          required
        />
        <div className="flex items-center gap-3">
          <label htmlFor="perishable">O produto é perecível?</label>
          <input
            id="perishable"
            name="perishable"
            type="checkbox"
            checked={values.perishable}
            onChange={onCheckboxChange}
          />
        </div>
        <label htmlFor="expirationDate">Data de vencimento</label>
        <input
          id="expirationDate"
          name="expirationDate"
          type="date"
          value={values.expirationDate}
          min={values.manufacturedDate}
          onChange={onChange}
          required={values.perishable}
          disabled={!values.perishable}
        />
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
        />
        <button type="submit">Cadastrar</button>
      </fieldset>
    </form>
  );
}
