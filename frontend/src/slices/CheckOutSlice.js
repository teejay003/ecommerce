import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



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
  shipping: null,
  paymentMethod: null,
  order: null
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
        console.log(action.payload)
        
      })
      .addCase(placeOrder.rejected, (state, action) => {

      })
  }
})

export const { addShipping, addPaymentMethod } = CheckOutSlice.actions
export default CheckOutSlice.reducer