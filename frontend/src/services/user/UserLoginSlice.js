import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
    userInfo:userInfoFromStorage,
    loading:null,
    error:null,
}

const UserLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    setUserInfo:(state,action) => {
        state.userInfo = action.payload
    },
    setLoading:(state,action)=>{
        state.loading=action.payload
    },
    setError:(state,action)=>{
        state.error=action.payload
    }
  }
});

export const {setLoading,setUserInfo,setError} = UserLoginSlice.actions

export default UserLoginSlice.reducer

export const login = (email,password) => async (dispatch) => {
    try{dispatch(setLoading(true))
    const config ={
        headers: {
            "Content-Type":"application/json"
        }
    }
    const {data} = await axios.post("/api/users/login",{email,password},config)
    dispatch(setLoading(false))
    dispatch(setUserInfo(data))
    localStorage.setItem("userInfo",JSON.stringify(data))
}catch(error){
    dispatch(setLoading(false))
    const err = error.response && error.response.data.message?error.response.data.message:error.message
    dispatch(setError(err))
}
}

export const logout= () => async(dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch(setUserInfo(null))
} 



