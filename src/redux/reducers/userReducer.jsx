import { createSlice } from "@reduxjs/toolkit";
import {
  ACCESS_TOKEN,
  getStore,
  getStoreJson,
  http,
  setCookie,
  setStore,
  setStoreJson,
  USER_LOGIN,
} from "../../util/config";
import { history } from "../../index";

const initialState = {
  userRegister: {},
  userLogin: getStoreJson(USER_LOGIN),
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getProfileAction: (state, action) => {
      state.userLogin = action.payload;
    },
  },
});

export const { getProfileAction } = userReducer.actions;

export default userReducer.reducer;

export const registerApi = (userRegister) => {
  return async (dispatch) => {
    try {
      const result = await http.post("/Users/signup", userRegister);
      console.log(result);
      alert(result.data.message);
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginApi = (userLogin) => {
  return async (dispatch) => {
    try {
      const result = await http.post("/Users/signin", userLogin);

      setCookie(ACCESS_TOKEN, result.data.content.accessToken, 30);
      setStore(ACCESS_TOKEN, result.data.content.accessToken);

      const action = getProfileApi();
      dispatch(action);
      history.push("/")
      window.scrollTo(0, 10);
    } catch (error) {
      console.log(error);
    }
  };
};
export const getProfileApi = () => {
  return async (dispatch) => {
    try {
      const result = await http.post("/Users/getProfile");

      const action = getProfileAction(result.data.content);
      dispatch(action);
      setStoreJson(USER_LOGIN, result.data.content);
    } catch (error) {
      console.log(error);
    }
  };
};
