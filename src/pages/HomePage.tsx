import { CreateProductForm } from "../components/HomePage/CreateProductForm";
import { PageHeader } from "../components/HomePage/PageHeader";
import { ProductsTable } from "../components/HomePage/ProductsTable";

export function HomePage() {
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
