import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 success:null,
 loading:null,
 error:null
}

const UserUpdateSlice = createSlice({
  name: "userUpdate",
  initialState,
  reducers: {
  setSuccess:(state,action) => {
    state.users = action.payload
},
setLoading:(state,action)=>{
    state.loading=action.payload
},
setError:(state,action)=>{
    state.error=action.payload
},}
});

export const {setError,setLoading,setSuccess} = UserUpdateSlice.actions

export default UserUpdateSlice.reducer