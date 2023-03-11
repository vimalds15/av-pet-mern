import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  allProducts:[],
  currProduct:null,
  loading:true,
  error:null,
}

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setAllProducts:(state,action)=>{
      state.allProducts=action.payload
    },
    setLoading:(state,action) => {
      state.loading = action.payload
    },
    setError:(state,action) => {
      state.error= action.payload
    },
    setProduct:(state,action)=>{
      state.currProduct = action.payload
    }
  }
});

export const {setAllProducts,setLoading,setError,setProduct} = ProductSlice.actions

export default ProductSlice.reducer

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    const {data} = await axios.get("/api/products")
    dispatch(setAllProducts(data))
    dispatch(setLoading(false))
  } catch (error) {
    dispatch(setLoading(false))
    const payload = error.response && error.response.data.message ?error.response.data.message:error.message
    dispatch(setError(payload))
  }
}

export const getProductById = (id) => async(dispatch) => {
  try {
    dispatch(setLoading(true))
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(setProduct(data))
    dispatch(setLoading(false))
  } catch (error) {
    dispatch(setLoading(false))
    const payload = error.response && error.response.data.message ?error.response.data.message:error.message
    dispatch(setError(payload))
  }
}