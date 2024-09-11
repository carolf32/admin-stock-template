import { IoCloseCircleOutline } from "react-icons/io5";
import { useProductContext } from "../hooks/useProductContext";
import { useForm } from "react-hook-form";
import { ProductType } from "../interfaces/products.interface";

export const EditProductModal = () => {
  const { setIsEditProductModalOpen, updateProduct, editProduct } =
    useProductContext();

  if (!editProduct) {
    return null;
  }

  const { handleSubmit, register } = useForm({
    values: {
      name: editProduct.name,
      description: editProduct.description,
      price: editProduct.price,
      stock: editProduct.stock,
      images: editProduct.images,
      category: editProduct.category,
    },
  });

  const submit = (formData: Partial<ProductType>) => {
    const updatedProduct: Partial<ProductType> = {
      ...formData,
      stock: Number(formData.stock),
      price: Number(formData.price),
    };
    updateProduct(updatedProduct);
    console.log(updatedProduct);
    setIsEditProductModalOpen(false);
  };

  return (
    <div
      role="dialog"
      className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white p-6 md:w-1/2 rounded-lg shadow-lg  ">
        <div className="flex justify-between ">
          <h1 className="font-semibold text-2xl px-5 pb-3">Edit product</h1>
          <IoCloseCircleOutline
            size={20}
            className="mr-5 cursor-pointer"
            onClick={() => setIsEditProductModalOpen(false)}
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
            className="bg-slate-100 rounded p-2"
            {...register("description")}
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Product's price"
            className="bg-slate-100 rounded p-2"
            {...register("price")}
            required
          />
          <input
            type="number"
            placeholder="Product's stock quantity"
            className="bg-slate-100 rounded p-2"
            {...register("stock")}
            required
          />
          <input
            type="text"
            placeholder="Product's images"
            className="bg-slate-100 rounded p-2"
            {...register("images")}
            required
          />
          <select
            className="bg-slate-100 rounded p-2"
            {...register("category")}
            required
          >
            <option value="headphones">Headphone</option>
            <option value="earpads">Earpad</option>
            <option value="acessories">Acessory</option>
          </select>
          <button className="bg-blue-500 rounded text-white font-semibold p-2">
            Update product
          </button>
        </form>
      </div>
    </div>
  );
};
