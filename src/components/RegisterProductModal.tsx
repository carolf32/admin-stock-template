import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useProductContext } from "../hooks/useProductContext";
import { ProductType } from "../interfaces/products.interface";

export const RegisterProductModal = () => {
  const { setIsRegisterProductModalOpen, addProduct } = useProductContext();

  const { handleSubmit, register } = useForm<ProductType>();

  const submit = (formData: any) => {
    const imagesArray = formData.images.split(",");
    const updatedProduct = {
      ...formData,
      stock: Number(formData.stock),
      price: Number(formData.price),
      images: imagesArray,
    };
    addProduct(updatedProduct);
    console.log(updatedProduct);
    setIsRegisterProductModalOpen(false);
  };

  return (
    <div
      role="dialog"
      className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white p-6 md:w-1/2 rounded-lg shadow-lg  ">
        <div className="flex justify-between ">
          <h1 className="font-semibold text-2xl px-5 pb-3">
            Register new Product
          </h1>
          <IoCloseCircleOutline
            size={20}
            className="mr-5 cursor-pointer"
            onClick={() => setIsRegisterProductModalOpen(false)}
          />
        </div>

        <form
          className="flex flex-col gap-5 w-full px-5"
          onSubmit={handleSubmit(submit)}
        >
          <input
            type="text"
            placeholder="Product's name"
            {...register("name")}
            className="bg-slate-100 rounded p-2"
            required
          />
          <input
            type="text"
            placeholder="Product's description"
            {...register("description")}
            className="bg-slate-100 rounded p-2"
            required
          />
          <input
            type="text"
            placeholder="Product's price"
            {...register("price")}
            className="bg-slate-100 rounded p-2"
            required
          />
          <input
            type="number"
            placeholder="Product's stock quantity"
            {...register("stock")}
            className="bg-slate-100 rounded p-2"
            required
          />
          <input
            type="text"
            placeholder="Product's images"
            {...register("images")}
            className="bg-slate-100 rounded p-2"
            required
          />
          <select
            className="bg-slate-100 rounded p-2"
            {...register("category")}
          >
            <option value="headphones">Headphone</option>
            <option value="earpads">Earpad</option>
            <option value="acessories">Acessory</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 rounded text-white font-semibold p-2"
          >
            Register product
          </button>
        </form>
      </div>
    </div>
  );
};
