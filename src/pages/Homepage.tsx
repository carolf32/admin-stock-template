import { CgLogOff } from "react-icons/cg";
import { Product } from "../components/Product";
import { RegisterProductModal } from "../components/RegisterProductModal";
import { useUserContext } from "../hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../hooks/useProductContext";

export const Homepage = () => {
  const { user, setUser } = useUserContext();
  const {
    products,
    setIsRegisterProductModalOpen,
    isRegisterProductModalOpen,
  } = useProductContext();
  const navigate = useNavigate();

  const cleanUser = () => {
    setUser(null);
    localStorage.removeItem("@USER");
    localStorage.removeItem("@TOKEN");
    navigate("/login");
  };

  return (
    <div className="bg-gray-300 h-full w-full p-5">
      <div className="flex justify-between ">
        <h3 className="font-semibold text-xl">
          Welcome, {user ? user.name : "Guest"}
        </h3>
        <div className="flex gap-5 items-center">
          <a
            className="bg-blue-500 text-white font-semibold rounded  py-2 px-3 cursor-pointer"
            onClick={() => setIsRegisterProductModalOpen(true)}
          >
            Register new product
          </a>
          {isRegisterProductModalOpen ? <RegisterProductModal /> : null}
          <a className="bg-gray-200 font-semibold p-2 rounded">
            <CgLogOff
              size={23}
              onClick={cleanUser}
              className="cursor-pointer"
            />
          </a>
        </div>
      </div>
      <h2 className="font-semibold text-lg m-5">Stock products</h2>
      <ul className="lg:grid lg:grid-cols-2">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};
