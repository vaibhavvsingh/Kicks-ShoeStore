import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Bag from "./pages/Bag";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:type" element={<Home />} />
          <Route path="/bag" element={<Bag />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
