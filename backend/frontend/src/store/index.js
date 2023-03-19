import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../slices/AuthSlice';
import CartSlice from '../slices/CartSlice';
import ProductSlice from '../slices/ProductSlice';
import CheckOutSlice from '../slices/CheckOutSlice';
import AdminSlice from '../slices/AdminSlice';


// Authenticate User if Logged in before
const user = JSON.parse(localStorage.getItem("userInfo")) || null,
  isLoggedIn = user ? true : false
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const shipping = JSON.parse(localStorage.getItem("shipping")) || null;
const paymentMethod = JSON.parse(localStorage.getItem("paymentMethod")) || '';

 

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    cart: CartSlice,
    products: ProductSlice,
    checkout: CheckOutSlice,
    admin: AdminSlice,
    
  
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
      shipping,
      paymentMethod
    }
  }
});

export default store 