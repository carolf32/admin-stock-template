export interface ProductType {
  images: string[];
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: Date;
}

export interface ProductContextProps {
  product: ProductType | null;
  setProduct: React.Dispatch<React.SetStateAction<ProductType | null>>;
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  addProduct: (payload: ProductType) => Promise<void>;
  deleteProduct: (removingId: number) => Promise<void>;
  selectToEdit: (item: ProductType) => void;
  selectToDelete: (item: ProductType) => void;
  wantToRemoveProduct: ProductType | null;
  updateProduct: (payload: Partial<ProductType>) => Promise<void>;
  editProduct: ProductType | null;
  setEditProduct: React.Dispatch<React.SetStateAction<ProductType | null>>;
  isRegisterProductModalOpen: boolean;
  setIsRegisterProductModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditProductModalOpen: boolean;
  setIsEditProductModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  areYouSureModalOpen: boolean;
  setAreYouSureModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
