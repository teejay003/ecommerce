import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Route, Routes} from 'react-router-dom'
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import SearchBar from "./components/SearchBar";
import Cart from "./pages/Cart";


function App() {
  return (
    <div> 
      <Header />
      <main >
      <SearchBar />
        <div className="container">
          <Routes>
            <Route path="/" element= {<Home />} />
            <Route path="/shop" element= {<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/product/cart/" element = {<Cart />} />
          </Routes>
       </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
