import React, { useEffect } from "react";
import Product from "../components/Product.jsx";
import Spinner from "../components/Spinner.jsx";
import SearchBar from "../components/SearchBar";

// Reudx
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../slices/ProductSlice.js";

function Home() {
  const { loading, products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  return (
    <>
      <SearchBar />
      <div className="container">
        <h1 className="display-4">Latest Products</h1>
        <div className="row">
          {products.map((product, i) => (
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={i}>
              <Product product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
