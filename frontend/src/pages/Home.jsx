import React, {useContext, useEffect} from 'react'
// import products from '../products.js'
import Product from '../components/Product.jsx'
import ProductContext from '../context/productContext.jsx'
import Spinner from '../components/Spinner.jsx';




function Home() {


  const { products, getProducts, loading } = useContext(ProductContext)
 
  useEffect(() => {
    getProducts()
    // eslint-disable-next-line
  },[] )
  
  if (loading) return <Spinner  />

  return ( 
    <div>
      <h1 className="display-4">Latest Products</h1>
      <div className="row">
        {products.map((product, i) => (
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={i}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home