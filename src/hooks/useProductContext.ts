import { useContext } from "react";
import { ProductContextProps } from "../interfaces/products.interface";

import { ProductContext } from "../providers/ProductContext";

export const useProductContext = (): ProductContextProps => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a Provider");
  }

  return context;
};
