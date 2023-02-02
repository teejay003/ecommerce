import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  products: [],
  product: {}, 
  loading: true,
}

//Fetch all products from database
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const { data } = await axios.get("/api/products/")
    return data
  }
)

// Fetch single product from database
export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (id) => {
    const {data} = await axios.get(`/api/products/${id}/`)
    return data
  }
)


const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetching all products handler
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const products = action.payload
        state.products = products
        state.loading = false
      })
    
    // Fetching single product handler
    builder
      .addCase(fetchProduct.fulfilled, (state, action) => {
        const prouduct = action.payload
        state.product = prouduct
        state.loading = false
      })
  }
})

export default ProductSlice.reducer
