import { createSlice } from '@reduxjs/toolkit'

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
    }
  }
});

export const {setError,setLoading,setSuccess,setProduct} = ProductUpdateSlice.actions

export default ProductUpdateSlice.reducer