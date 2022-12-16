import { createContext, useReducer } from "react";
import CartReducer from "../reducer/CartReducer";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const initialState = {
    cartItems: [],
    loading: true,
    total: 0,
    subtotal: 0,
  };


  const [state, dispatch] = useReducer(CartReducer, initialState);

  // Add to cart
  async function addToCart(id, quantity) {
    try {

      const { data } = await axios.get(`/api/products/${id}`);

      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      // check if item already exist in the cart
      const itemExist = cartItems.find((item) => item.id === data.id);
      if (itemExist) {
        // update the item if already exist
        cartItems = cartItems.map( item => item.id === itemExist.id ?{...data, quantity} : item)
      } else cartItems.push({ ...data, quantity });

      // store in local storage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      dispatch({
        type: "ADD_TO_CART",
        payload: cartItems,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Get cart items
  function getCartItems() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    dispatch({
      type: "GET_CART_ITEMS",
      payload: cartItems,
    });
  }

  // Remove cart item
  function removeCartItem(id) {

    // Get cart items from storage
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    // Remove an item
    cartItems = cartItems.filter((item) => item.id !== id);

    // store the remaining items in local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    dispatch({
      type: "REMOVE_CART_ITEM",
      payload: cartItems,
    });
  }

  return (
    <CartContext.Provider
      value={{
        ...state,

        // Method
        addToCart,
        getCartItems,
        removeCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


export default CartContext