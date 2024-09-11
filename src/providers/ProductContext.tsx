import { createContext, ReactNode, useEffect, useState } from "react";
import {
  ProductType,
  ProductContextProps,
} from "../interfaces/products.interface";
import { api } from "../services/api";

export const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [editProduct, setEditProduct] = useState<ProductType | null>(null);
  const [wantToRemoveProduct, setWantToRemoveProduct] =
    useState<ProductType | null>(null);
  const [isRegisterProductModalOpen, setIsRegisterProductModalOpen] =
    useState<boolean>(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] =
    useState<boolean>(false);
  const [areYouSureModalOpen, setAreYouSureModalOpen] =
    useState<boolean>(false);
  const token = localStorage.getItem("@TOKEN-ADMIN");

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (payload: ProductType) => {
    try {
      const response = await api.post("/products", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts([...products, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const selectToDelete = (item: ProductType) => {
    setWantToRemoveProduct(item);
    setAreYouSureModalOpen(true);
  };

  const deleteProduct = async (removingId: number) => {
    try {
      await api.delete(`/products/${removingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newList = products.filter((item) => item.id === removingId);
      setProducts(newList);
      await fetchProducts();
      setAreYouSureModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const selectToEdit = (item: ProductType) => {
    setEditProduct(item);
    setIsEditProductModalOpen(true);
  };

  const updateProduct = async (payload: Partial<ProductType>) => {
    if (editProduct) {
      try {
        const response = await api.patch(
          `/products/${editProduct.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProducts((prevProducts) =>
          prevProducts.map((item) =>
            item.id === editProduct.id ? response.data : item
          )
        );

        setIsEditProductModalOpen(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        setProduct,
        products,
        setProducts,
        addProduct,
        deleteProduct,
        selectToEdit,
        selectToDelete,
        wantToRemoveProduct,
        updateProduct,
        editProduct,
        setEditProduct,
        isRegisterProductModalOpen,
        setIsRegisterProductModalOpen,
        isEditProductModalOpen,
        setIsEditProductModalOpen,
        areYouSureModalOpen,
        setAreYouSureModalOpen,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
