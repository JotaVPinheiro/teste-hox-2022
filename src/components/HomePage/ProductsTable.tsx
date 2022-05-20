import { api } from "../../lib/api";
import { ProductsTableItem } from "./ProductsTableItem";

export function ProductsTable() {

  function getProducts() {
    const products = api.get('/products')
  }

  return (
    <table className="w-full h-min table-auto border-collapse text-left">
      <thead className="pl-">
        <tr className="bg-slate-700 h-8 ">
          <th>Produto</th>
          <th>Data de fabricação</th>
          <th>Data de validade</th>
          <th>Preço</th>
          <th>Editar</th>
          <th>Deletar</th>
        </tr>
      </thead>
      <tbody>
        <ProductsTableItem
          name="Feijão"
          manufacturedDate={new Date("05/01/2022")}
          expirationDate={new Date("11/11/2022")}
          price={10.07}
        />
        <ProductsTableItem
          name="Macarrão"
          manufacturedDate={new Date("05/01/2022")}
          expirationDate={new Date("01/07/2023")}
          price={5.4}
        />
        <ProductsTableItem
          name="Corda 5M"
          manufacturedDate={new Date("05/01/2022")}
          expirationDate={null}
          price={24}
        />
      </tbody>
    </table>
  );
}
