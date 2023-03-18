import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    success:null,
    error:null,
    loading:null,
    product:{},
}

const ProductUpdateSlice = createSlice({
  name: "productUpdate",
  initialState,
  reducers: {
    setError:(state,action)=>{
        state.error=action.payload
    },
    setSuccess:(state,action)=>{
        state.success=action.payload
    },
    setLoading:(state,action)=>{
        state.loading=action.payload
    },
    setProduct:(state,action)=> {
        state.product = action.payload
    },
    setProductUpdateReset:(state)=> {
        state.product = {}
    }
  }
});

export const {setError,setLoading,setSuccess,setProduct,setProductUpdateReset} = ProductUpdateSlice.actions

export default ProductUpdateSlice.reducer

export const updateProduct = (product) => async(dispatch, getState) => {
    try {
        dispatch(setLoading(true))
        const {token} =getState().userLogin.userInfo
        const config ={
            headers: {
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }
  
  
        const {data}=await axios.put(`/api/products/${product._id}`,product,config)
        dispatch(setSuccess(true))
        dispatch(setProduct(data))
        dispatch(setLoading(false))
      } catch (error) {
        const err = error.response && error.response.data.message?error.response.data.message:error.message
        dispatch(setError(err))
        dispatch(setLoading(false))
    }
  }