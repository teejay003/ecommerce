import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  loading: false,
};

// ADD ITEM TO CART
export const addItemToCart = createAsyncThunk(
  "cart/addToItemToCart",
  async ({ id, quantity,totalPrice }) => {
    const { data } = await axios.get(`/api/products/${id}`);
    return { data, quantity, totalPrice };
  }
);

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // REMOVE ITEM FROM CART
    removCartItems: (state, action) => {
      // Get cart items from storage
      const id = action.payload;
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      // Remove an item
      cartItems = cartItems.filter((item) => item.id !== id);

      // store the remaining items in local storage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      //Update the cart state
      state.cartItems = cartItems;
    },

    // CHANGE ITEM QUANTITY
    changeQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      // Find the item in localStorage
      cartItems = cartItems.map((item) => {
        if (item.id === id) {
          //change it quantity
          item.quantity = quantity
        }
        return item
      });
      
      //update state
      state.cartItems = cartItems
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
    },
    
    addtotalPrice: (state, action) => {
      state.cartItems[0].totalPrice = action.payload
    
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
      })

      .addCase(addItemToCart.fulfilled, (state, action) => {
        const { data, quantity, totalPrice } = action.payload;
        data.totalPrice = totalPrice

        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        // check if item already exist in the cart
        const itemExist = cartItems.find((item) => item.id === data.id);
        if (itemExist) {
          // update the item if already exist
          cartItems = cartItems.map((item) =>
            item.id === itemExist.id ? { ...data, quantity } : item
          );
        } else cartItems.push({ ...data, quantity });

        // store in local storage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        // Udate the cart state
        state.cartItems = cartItems;
        state.loading = false;

      });
  },
});

export const { removCartItems, changeQuantity, addtotalPrice } = CartSlice.actions;
export default CartSlice.reducer;
