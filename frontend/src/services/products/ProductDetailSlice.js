import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    productInfo:{},
    loading:null,
    error:null,
}

const ProductDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
      setLoading:(state,action) => {
        state.loading = action.payload
      },
      setError:(state,action) => {
        state.error= action.payload
      },
      setProduct:(state,action)=>{
        state.productInfo = action.payload
      }
  }
});

export const {setError,setLoading,setProduct} = ProductDetailSlice.actions

export default ProductDetailSlice.reducer

export const getProductById = (id) => async(dispatch) => {
    try {
      dispatch(setLoading(true))
      const {data} = await axios.get(`/api/products/${id}`)
      console.log(data)
      dispatch(setProduct(data))
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setLoading(false))
      const payload = error.response && error.response.data.message ?error.response.data.message:error.message
      dispatch(setError(payload))
    }
  }