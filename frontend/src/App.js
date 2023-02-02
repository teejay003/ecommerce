import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Route, Routes} from 'react-router-dom'
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Shipping from "./pages/Shipping";
import { ToastContainer } from 'react-toastify';





function App() {

    return (
    <>
      <Header />
      <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/product/cart/" element={<Cart />} />
            <Route path="/user/register/" element={<Register />} />
            <Route path="/user/profile/" element={<Profile />} />
            <Route path="/user/login/" element={<Login />} />
            <Route path="/checkout/shipping/" element={<Shipping />} />
          </Routes>
      </main>

      <Footer />
    {/* Alert Container */}
    <ToastContainer />
    </>
  );
}

export default App;
