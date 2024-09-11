import { useProductContext } from "../hooks/useProductContext";

export const AreYouSure: React.FC = () => {
  const { setAreYouSureModalOpen, deleteProduct, wantToRemoveProduct } =
    useProductContext();

  const handleDelete = async () => {
    if (wantToRemoveProduct) {
      await deleteProduct(wantToRemoveProduct.id);
      console.log(wantToRemoveProduct);
    }
  };

  return (
    <div
      role="dialog"
      className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white p-5 md:w-1/2 rounded-lg shadow-lg flex justify-center items-center flex-col">
        <h1 className="font-semibold text-2xl px-5 pb-3">Are you sure?</h1>
        <div className="flex gap-5">
          <button
            className="bg-green-500 rounded p-2 px-5"
            onClick={handleDelete}
          >
            YES, DELETE
          </button>
          <button
            className="bg-red-500 rounded p-2 px-5"
            onClick={() => setAreYouSureModalOpen(false)}
          >
            NO, CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};
