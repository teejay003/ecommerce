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
import Order from "./pages/Order";
import Payment from "./pages/Payment";
import Users from "./pages/admin/Users";
import { ToastContainer } from 'react-toastify';
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import CreateProduct from "./pages/admin/CreateProduct";
import Orders from "./pages/admin/Orders";
import OrderDetails from "./pages/admin/OrderDetails";





function App() {

    return (
    <>
      <Header />
      <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id/" element={<ProductDetail />} />
            <Route path="/product/cart/" element={<Cart />} />
            <Route path="/user/register/" element={<Register />} />
            <Route path="/user/profile/" element={<Profile />} />
            <Route path="/user/login/" element={<Login />} />
            <Route path="/checkout/shipping/" element={<Shipping />} />
            <Route path="/checkout/payment/" element={<Payment />} />
            <Route path="/checkout/order/" element={<Order />} />
            <Route path="/admin/users/" element={<Users />} />
            <Route path="/admin/products/" element={<Products />} />
            <Route path="/admin/orders/" element={<Orders />} />
            <Route path="/admin/order/:id/" element={<OrderDetails />} />
            <Route path="/admin/product/update/:id/" element={<UpdateProduct />} />
            <Route path="/admin/product/create/" element={<CreateProduct />} />
          </Routes>
      </main>

      <Footer />
    {/* Alert Container */}
    <ToastContainer />
    </>
  );
}

export default App;
