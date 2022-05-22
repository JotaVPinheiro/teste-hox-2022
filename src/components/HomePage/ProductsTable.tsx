import { ProductList } from "./ProductsList";

export function ProductsTable() {
  return (
    <table className="w-full h-min table-fixed border-collapse text-left">
      <thead className="pl-">
        <tr className="bg-slate-700 h-8 ">
          <th>Produto</th>
          <th>Data de fabricação</th>
          <th>Data de validade</th>
          <th>Preço</th>
          <th className="w-8"></th>
          <th className="w-8"></th>
        </tr>
      </thead>
      <tbody>
        <ProductList />
      </tbody>
    </table>
  );
}
