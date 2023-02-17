import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  users: [],
  products: [],
  orders: [],
  loading: true,
}

// Fetch all Users
export const getUsers = createAsyncThunk(
  'admin/getUsers',
  async (token) => {

    const {data} = await axios.get("/api/admin/users/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    
    return data
  }
)

// Delete User
export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async ({id, token}) => {

    const {data} = await axios.delete(`/api/admin/user/delete/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    
    return data
  }
)

// Edit User
export const editUser = createAsyncThunk(
  'admin/editUser',
  async ({id, token}) => {

    const {data} = await axios.get(`/api/admin/user/edit/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data
  }
)

// Edit User
export const fetchOrders = createAsyncThunk(
  'admin/fetchOrders',
  async (token) => {

    const {data} = await axios.get(`/api/admin/orders/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data
  }
)



 const AdminSlice = createSlice({
  name: 'admin',
  initialState,
   extraReducers: (builder) => {
     builder
       .addCase(getUsers.fulfilled, (state, action) => {
         state.users = action.payload
         state.loading = false
       })
     builder
       .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false
        state.users =action.payload
       })
       .addCase(deleteUser.pending, (state, action) => {
        state.loading = true
       })
       .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload
        state.loading = false
       })
       .addCase(fetchOrders.pending, (state, action) => {
        state.loading = true
       })

  }
  
})


// export const {} = AdminSlice.actions
export default AdminSlice.reducer

