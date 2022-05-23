import { CreateProductForm } from "../components/HomePage/CreateProductForm";
import { Navbar } from "../components/HomePage/Navbar";
import { ProductsTable } from "../components/HomePage/ProductsTable";

export function HomePage() {
  return (
    <>
      <Navbar />
      <div className="w-screen h-full flex">
        <div className="mt-10 mx-12">
          <ProductsTable />
        </div>
        <div className="mt-10 mx-12 h-min bg-gray-800">
          <CreateProductForm />
        </div>
      </div>
    </>
  );
}
