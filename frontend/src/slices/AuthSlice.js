import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  user: null,
  isLoggedIn: false,
};

// Register User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credential) => {
    const { data } = await axios.post("/api/user/register/", { ...credential });
    return data;
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "auth/logingUser",
  async (credential) => {
    const { data } = await axios.post("/api/user/login/", { ...credential });
    return data;
  }
);

// Update User Profile
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (credential) => {

    const { data } = await axios.put("/api/user/profile/update/", credential, {
      headers: {
        Authorization: `Bearer ${credential.token}`,
      },
    });
    return data;
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userInfo");
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    // HANDLE USER LOGIN
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload; // update user with returned value.
        //store user in local storage.
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
        // set user to login
        state.isLoggedIn = true;
        toast.success(`Welcome ${action.payload.username}`);
      })
      .addCase(loginUser.rejected, (state, action) => {
        toast.error("username or password not correct!!!");
      });

    //HANDLE USER REGISTRATION
    builder.addCase(registerUser.fulfilled, (state, action) => {
      let { userExist, message } = action.payload;
      if (userExist) {
        return toast.warning(message);
      }

      state.user = action.payload; // update user with returned value.
      //store user in local storage.
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      // set user to login
      state.isLoggedIn = true;
      toast.success(`Welcome ${action.payload.username}`);
    });

    // HANDLE USER UPDATE
    builder
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        let { userExist, message } = action.payload;
        if (userExist) {

          toast.warning(message);
        } else {
          state.user = action.payload; // update user with returned value.
          //store user in local storage.
          localStorage.setItem("userInfo", JSON.stringify(action.payload));
          // set user to login
          state.isLoggedIn = true;
          toast.success("Profile Updated");

        }

      })

      .addCase(updateUserProfile.rejected, (state, action) => {
        toast.error("Something went wrong");
    
      });
  },
});

export const { login, logout, setUser } = AuthSlice.actions;
export default AuthSlice.reducer;
