import { GoGear } from "react-icons/go";
import { BsTrash } from "react-icons/bs";
import { EditProductModal } from "./EditProductModal";
import { AreYouSure } from "./AreYouSure";
import { ProductType } from "../interfaces/products.interface";
import { useProductContext } from "../hooks/useProductContext";

interface ItemProps {
  product: ProductType;
}

export const Product: React.FC<ItemProps> = ({ product }) => {
  const {
    selectToEdit,
    selectToDelete,
    editProduct,
    isEditProductModalOpen,
    areYouSureModalOpen,
  } = useProductContext();

  return (
    <div className="bg-white rounded m-5  flex justify-between p-5">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">PRODUCT'S NAME</h3>
        <h3>{product.name}</h3>
        <h3 className="font-semibold">PRODUCT'S DESCRIPTION</h3>
        <h3>{product.description}</h3>
        <h3 className="font-semibold">PRODUCT'S STOCK QUANTITY</h3>
        <h3>{product.stock}</h3>
        <h3 className="font-semibold">PRODUCT'S PRICE</h3>
        <h3>€{product.price.toFixed(2)}</h3>
        <h3 className="font-semibold">PRODUCT'S CATEGORY</h3>
        <h3>{product.category}</h3>
        {product.images && product.images.length > 0 ? (
          <div className="flex gap-2 max-w-50 flex-wrap">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} image ${index + 1}`}
                className="w-24 h-24 object-cover"
              />
            ))}
          </div>
        ) : (
          <p>No images available</p>
        )}
      </div>
      <div className="flex gap-2 cursor-pointer">
        <GoGear onClick={() => selectToEdit(product)} />
        {isEditProductModalOpen && editProduct ? <EditProductModal /> : null}
        <BsTrash
          className="cursor-pointer"
          onClick={() => selectToDelete(product)}
        />
        {areYouSureModalOpen ? <AreYouSure /> : null}
      </div>
    </div>
  );
};
