import { CreateProductForm } from "../components/HomePage/CreateProductForm";
import { Navbar } from "../components/HomePage/Navbar";
import { ProductsTable } from "../components/HomePage/ProductsTable";

export function HomePage() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen h-full flex justify-center items-center flex-col-reverse xl:flex-row xl:items-start">
        <div className="m-10 max-w-4xl">
          <ProductsTable />
        </div>
        <div className="m-10 bg-gray-800 rounded-lg w-96 shadow-md">
          <CreateProductForm />
        </div>
      </div>
    </>
  );
}
