import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  users: [],
  singleUser: {},
  error: null,
  isLoggedIn: false,
  currentUser: null,
  loading: false,
  isAdmin: false,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUsers(state, action) {
      state.users = action.payload;
    },
    setUser(state, action) {
      state.users = action.payload;
    },
    signInStart(state) {
      state.loading = true;
      state.error = null;
    },
    signInSuccess(state, action) {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin;
    },
    signInFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSingleUser(state, action) {
      state.singleUser = action.payload;
    },
    registerUser(state, action) {
      state.users.push(action.payload);
    },
    deleteUser(state, action) {
      state.users = state.users.filter(user => user._id !== action.payload);
    },
    updateUser(state, action) {
      state.users = state.users.map(user => user._id === action.payload._id ? action.payload : user);
    },
    signinUser(state, action) {
      state.isLoggedIn = true;
      state.singleUser = action.payload;
      state.currentUser = action.payload;
      state.isAdmin = action.payload.isAdmin;
    },
    signoutUser(state) {
      state.isLoggedIn = false;
      state.singleUser = {};
      state.currentUser = null;
      state.isAdmin = false;
    },
    signoutSuccess(state) {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
      state.token = null;
      state.isAdmin = false;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    userDetails(state, action) {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { fetchUsers,   userDetails,setUser, fetchSingleUser,signInStart,signInSuccess, signoutSuccess,signInFailure,registerUser, deleteUser, updateUser, signinUser, signoutUser, setError } = userSlice.actions;
export default userSlice.reducer;

export function signin(data) {
  return async function signinThunk(dispatch, getState) {
    try {
      const response = await axios.post("http://localhost:8080/api/users/signin", data)
      const result = response.data;
      dispatch(signinUser(result));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
}

export const getUserDetails = (token) => async (dispatch) => {
  dispatch(signInStart());
  try {
    const response = await axios.get('http://localhost:8080/api/users/userDetail', {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(userDetails(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export function register(data) {
  return async function registerThunk(dispatch, getState) {
    try {
      const response = await axios.post("http://localhost:8080/api/users/register", data)
      const result = response.data;
      dispatch(registerUser(result));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
}


export function getUsers() {
  return async function getUsersThunk(dispatch, getState) {
    try {
      const response = await axios.get("http://localhost:8080/api/users/getAllUsers")
      const result = response.data;
      dispatch(fetchUsers(result));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
}

export function getUserById(id) {
  return async function getUserThunk(dispatch, getState) {
    try {
      const response = await axios.get(`http://localhost:8080/api/user/getUserById/${id}`)
      const result = response.data;
      dispatch(fetchSingleUser(result));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
}

export function updateUserById(id, data) {
  return async function updateUserThunk(dispatch, getState) {
    try {
      const response = await axios.put(`http://localhost:8080/api/users/updateUser/${id}`, data)
      const result = response.data;
      dispatch(updateUser(result));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
}

export function deleteUserById(id) {
  return async function deleteUserThunk(dispatch, getState) {
    try {
      const response = await axios.delete(`http://localhost:8080/api/users/deleteUser/${id}`)
      dispatch(deleteUser(id));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
}