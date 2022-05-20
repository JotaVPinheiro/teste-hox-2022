import { useState } from "react";
import { api } from "../../lib/api";

const initialState = {
  name: "",
  manufacturedDate: "",
  perishable: false,
  expirationDate: "",
  price: "",
};

export function CreateProductForm() {
  const [values, setValues] = useState(initialState);

  function onCheckboxChange(event: any) {
    const { checked, name } = event.target;
    setValues({ ...values, [name]: checked });
  }

  function onChange(event: any) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  async function handleSubmitForm(event: any) {
    event.preventDefault();

    await api.post("/products", values);
    setValues(initialState);
  }

  return (
    <form onSubmit={handleSubmitForm}>
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
          onChange={onChange}
          required
        />
        <button type="submit">Cadastrar</button>
      </fieldset>
    </form>
  );
}
