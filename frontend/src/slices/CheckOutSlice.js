import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';



 export const placeOrder = createAsyncThunk('cheout/placeOrder',
   async ({ order, token }) => {
  
    const { data } = await axios.post('/api/checkout/place-order/', { order },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    )
     return data
  }
)

const initialState = {
  shipping: {},
  paymentMethod: '',
  order: {}
}

const CheckOutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    addShipping: (state, action) => {
      state.shipping = action.payload
      localStorage.setItem('shipping', JSON.stringify(action.payload))
    },
    
    addPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
      localStorage.setItem('paymentMethod', JSON.stringify(action.payload))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.order = action.payload
        toast.success('Successful placed order')
        
      })
      .addCase(placeOrder.rejected, (state, action) => {
        toast.error('Something went wrong')
      })
  }
})

export const { addShipping, addPaymentMethod } = CheckOutSlice.actions
export default CheckOutSlice.reducer