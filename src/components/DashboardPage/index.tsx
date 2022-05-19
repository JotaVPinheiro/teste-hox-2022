import { CreateProductForm } from "./CreateProductForm";
import { PageHeader } from "./PageHeader";
import { ProductTable } from "./ProductTable";

export function DashboardPage() {
  return(
    <>
      <PageHeader />
      <div className="w-screen h-full bg-blue-500 flex">
        <ProductTable></ProductTable>
        <div className="h-[500px] w-[28rem] bg-red-600">
          <CreateProductForm></CreateProductForm>
        </div>
      </div>
    </>
  )
}