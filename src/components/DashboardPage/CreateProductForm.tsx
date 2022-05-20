export function CreateProductForm() {
  return (
    <form action="" method="post">
      <fieldset className="flex flex-col justify-center gap-3 p-10">
        <span className="flex justify-center text-3xl pb-6">
          Cadastrar produto
        </span>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Nome do produto"
        />
        <label htmlFor="manufacturedDate">Data de fabricação</label>
        <input id="manufacturedDate" name="manufacturedDate" type="date" />
        <div className="flex items-center gap-3">
          <label htmlFor="perishable">O produto é perecível?</label>
          <input id="perishable" name="perishable" type="checkbox" />
        </div>
        <label htmlFor="expirationDate">Data de vencimento</label>
        <input id="expirationDate" name="expirationDate" type="date" disabled />
        <input type="number" placeholder="Preço" />
        <button type="submit">Cadastrar</button>
      </fieldset>
    </form>
  );
}
