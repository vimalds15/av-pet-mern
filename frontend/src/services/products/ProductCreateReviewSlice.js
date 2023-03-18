import { createSlice } from '@reduxjs/toolkit'

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
  }
});

export const {setError,setLoading,setSuccess} = ProductCreateReviewSlice.actions

export default ProductCreateReviewSlice.reducer

