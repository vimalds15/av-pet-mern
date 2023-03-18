import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    products:[],
    loading:null,
    error:null,
}

const ProductTopSlice = createSlice({
  name: "productTop",
  initialState,
  reducers: {
    setProducts:(state,action)=>{
        state.products=action.payload
      },
      setLoading:(state,action) => {
        state.loading = action.payload
      },
      setError:(state,action) => {
        state.error= action.payload
      }
  }
});

export const {setProducts,setError,setLoading} = ProductTopSlice.actions

export default ProductTopSlice.reducer

export const getTopProducts = () => async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const {data} = await axios.get(`/api/products/top`)
      dispatch(setProducts(data))
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setLoading(false))
      const payload = error.response && error.response.data.message ?error.response.data.message:error.message
      dispatch(setError(payload))
    }
  }