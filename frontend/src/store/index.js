import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../slices/AuthSlice';
import CartSlice from '../slices/CartSlice';
import ProductSlice from '../slices/ProductSlice';
import CheckOutSlice from '../slices/CheckOutSlice';


// Authenticate User if Logged in before
const user = JSON.parse(localStorage.getItem("userInfo")) || null,
  isLoggedIn = user ? true : false
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const shipping = JSON.parse(localStorage.getItem("cartItems")) || null;

 

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    cart: CartSlice,
    products: ProductSlice,
    checkout: CheckOutSlice,
  
  },
  preloadedState: {
    auth: {
      user,
      isLoggedIn
    },
    cart: {
      cartItems,
      
    },

    checkout: {
      shipping
    }
  }
});

export default store 