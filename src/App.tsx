import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoutesMain from "./routes/RoutesMain";
import "./styles/index.css";

function App() {
  return (
    <div>
      <ToastContainer />
      <RoutesMain />
    </div>
  );
}

export default App;
