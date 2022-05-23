import { CreateProductForm } from "../components/HomePage/CreateProductForm";
import { Navbar } from "../components/HomePage/Navbar";
import { ProductsTable } from "../components/HomePage/ProductsTable";

export function HomePage() {
  return (
    <>
      <Navbar />
      <div className="w-screen h-full bg-blue-500 flex">
        <ProductsTable />
        <div className="h-[500px] w-[28rem] bg-red-600">
          <CreateProductForm />
        </div>
      </div>
    </>
  );
}
