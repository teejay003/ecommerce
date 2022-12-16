import { createContext, useReducer} from 'react'
import axios from 'axios';
import ProductReducer from '../reducer/ProductReducer';


const ProductContext = createContext()

export const ProductProvider = ({ children }) => {

  const initialState = {
    products: [],
    product: {},
    loading: true,
  }
  
  const [state, dispatch] = useReducer(ProductReducer, initialState)

  
  // Fetch products from the database
   async function getProducts() {
     try {
       const {data} = await axios.get("/api/products/");
       dispatch({
         type: 'SET_PRODUCTS',
         payload: data,
       })
     } catch (error) {
       console.log(error);
     }
  }
  
  // Fetch single product from the database
  async function getProduct(id, ) {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
       dispatch({
         type: "SET_PRODUCT",
         payload: data,
       });
      
     } catch (error) {
       console.log(error);
     }
  }
 
  return <ProductContext.Provider value={{
    // product states
    ...state,

    // product methods
    getProduct,
    getProducts,

  }}>

    {children}
  </ProductContext.Provider>
}


export default ProductContext
