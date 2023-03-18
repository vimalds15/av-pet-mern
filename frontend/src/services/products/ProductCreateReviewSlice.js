import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading:null,
    success:null,
    error:null
}

const ProductCreateReviewSlice = createSlice({
  name: "productCreateReviewSlice",
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
    setProductReviewReset:(state)=>{
        state.success=null
        state.loading=null
        state.error=null
    }
  }
});

export const {setError,setLoading,setSuccess,setProductReviewReset} = ProductCreateReviewSlice.actions

export default ProductCreateReviewSlice.reducer

export const createProductReview = (productId,review) => async(dispatch, getState) => {
    try {
        dispatch(setLoading(true))
        const {token} =getState().userLogin.userInfo
        const config ={
            headers: {
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }
  
  
        await axios.post(`/api/products/${productId}/reviews`,review,config)
        dispatch(setSuccess(true))
        dispatch(setLoading(false))
      } catch (error) {
        const err = error.response && error.response.data.message?error.response.data.message:error.message
        dispatch(setError(err))
        dispatch(setLoading(false))
    }
  }