import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
  shipping: null
}

const CheckOutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    addShipping: (state, action) => {
      state.shipping = action.payload
      localStorage.setItem('shipping', JSON.stringify(action.payload))
    }
  }
})

export const { addShipping } = CheckOutSlice.actions
export default CheckOutSlice.reducer