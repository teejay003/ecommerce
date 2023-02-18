import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  products: [],
  product: {
    name: "",
    brand: "",
    image: "",
    category: "",
    count_in_stock: "",
    description: "",
    price: "",
  },
  loading: true,
  created: false,
};


// Cteate Product
export const createProduct = createAsyncThunk(
  "admin/createProduct",
  async ({ credential, token }) => {
    const { data } = await axios.post(`/api/admin/product/create/`,credential, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type' : 'multipart/form-data',
      },
    });

  
    return data;
  }
);

//Fetch all products from database
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const { data } = await axios.get("/api/products/");

    return data;
  }
);

// Fetch single product from database
export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (id) => {
    const { data } = await axios.get(`/api/products/${id}/`);
    return data;
  }
);

// Update Product
export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ id, token, credential }) => {


    const { data } = await axios.put(
      `/api/admin/product/update/${id}/`,
      credential ,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async ({ id, token }) => {
    const { data } = await axios.delete(`/api/admin/product/delete/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
);

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCreated: (state) => {
      state.created = false
    }
  },
  extraReducers: (builder) => {
    // Fetching all products handler
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      const products = action.payload;
      state.products = products;
      state.loading = false;
    
    });

    // Fetching single product handler
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.product = action.payload
      state.loading = false;
    });
    
    // Delete Product
    builder
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.loading = true;
      });
    
    // Create Product
    builder
      .addCase(createProduct.fulfilled, (state, action) => {
        toast.success('New Product created!')
        state.products = action.payload
        state.created = true
      })
      .addCase(createProduct.rejected, (state, action) => {
        toast.error('Something went wrong!')
      });
    
    // Update Product
    builder
      .addCase(updateProduct.fulfilled, (state, action) => {
        toast.success('Product Updated!')
        state.product = action.payload
        state.loading = false
      })
      .addCase(updateProduct.rejected, (state, action) => {
        toast.error('Something went wrong!')
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.loading = true
      });
  },
});


export const {setCreated} = ProductSlice.actions

export default ProductSlice.reducer;
