import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    success:null,
    error:null,
    loading:null,
    product:{},
}

const ProductCreateSlice = createSlice({
  name: "productCreate",
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
    setProductCreateReset:(state)=> {
        state.product={}
        state.loading=null
        state.error=null
        state.success=null
    }
  }
});

export const {setError,setLoading,setSuccess,setProduct,setProductCreateReset} = ProductCreateSlice.actions

export default ProductCreateSlice.reducer

export const createProduct = () => async(dispatch, getState) => {
    try {
        dispatch(setLoading(true))
        const {token} =getState().userLogin.userInfo
        const config ={
            headers: {
                Authorization:`Bearer ${token}`
            }
        }
  
  
        const {data}=await axios.post(`/api/products`,{},config)
        dispatch(setSuccess(true))
        dispatch(setProduct(data))
        dispatch(setLoading(false))
      } catch (error) {
        const err = error.response && error.response.data.message?error.response.data.message:error.message
        dispatch(setError(err))
        dispatch(setLoading(false))
    }
  }