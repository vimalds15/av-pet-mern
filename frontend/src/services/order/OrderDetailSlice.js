import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  orderItems:[],
  shippingAddress:{},
  loading:null,
  success:null,
  error:null,
}

const OrderDetailSlice = createSlice({
  name: "orderDetail",
  initialState,
  reducers: {
    setOrderItems:(state,action) => {
      state.orderItems = action.payload
      state.loading=false
      state.success=true
    },
    setLoading:(state,action)=>{
      state.loading=action.payload
    },
    setError:(state,action)=>{
      state.error=action.payload
    }
  }
});

export const {setOrderItems,setError,setLoading} = OrderDetailSlice.actions

export default OrderDetailSlice.reducer

export const getOrderDetails = (id) => async(dispatch,getState) => {
  try {
      dispatch(setLoading(true))
      const {token} =getState().userLogin.userInfo
      const config ={
          headers: {
              Authorization:`Bearer ${token}`
          }
      }


      const {data} = await axios.get(`/api/orders/${id}`,config)
      dispatch(setOrderItems(data))
      dispatch(setLoading(false))
  } catch (error) {
      dispatch(setLoading(false))
      const err = error.response && error.response.data.message?error.response.data.message:error.message
      dispatch(setError(err))
  }
}