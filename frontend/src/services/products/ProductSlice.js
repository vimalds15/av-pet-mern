import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  allProducts:[],
  pages:null,
  page:null,
  loading:null,
  error:null,
}

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setAllProducts:(state,action)=>{
      state.allProducts=action.payload.products
      state.pages=action.payload.pages
      state.page=action.payload.page
    },
    setLoading:(state,action) => {
      state.loading = action.payload
    },
    setError:(state,action) => {
      state.error= action.payload
    }
  }
});

export const {setAllProducts,setLoading,setError} = ProductSlice.actions

export default ProductSlice.reducer

export const getAllProducts = (keyword="",pageNumber='') => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    const {data} = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
    dispatch(setAllProducts(data))
    dispatch(setLoading(false))
  } catch (error) {
    dispatch(setLoading(false))
    const payload = error.response && error.response.data.message ?error.response.data.message:error.message
    dispatch(setError(payload))
  }
}

