import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setUserInfo } from "./UserProfileSlice";

const initialState = {
  success: null,
  error: null,
};

const UserUpdateSlice = createSlice({
  name: "userUpdate",
  initialState,
  reducers: {
    setSuccess: (state, action) => {
      state.users = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setError, setSuccess } = UserUpdateSlice.actions;

export default UserUpdateSlice.reducer;

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    const { token } = getState().userLogin.userInfo;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);
    dispatch(setSuccess(true));
    dispatch(setUserInfo(data));
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setError(err));
  }
};
