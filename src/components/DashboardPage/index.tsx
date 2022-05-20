import { CreateProductForm } from "./CreateProductForm";
import { PageHeader } from "./PageHeader";
import { ProductsTable } from "./ProductsTable";

export function DashboardPage() {
  return (
    <>
      <PageHeader />
      <div className="w-screen h-full bg-blue-500 flex">
        <ProductsTable />
        <div className="h-[500px] w-[28rem] bg-red-600">
          <CreateProductForm />
        </div>
      </div>
    </>
  );
}
