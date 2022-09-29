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
  userFavorite: getStoreJson("USER_FAV"),
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getProfileAction: (state, action) => {
      state.userLogin = action.payload;
    },
    logOutUserAction: (state, action) => {
      localStorage.clear();
      state.userLogin = null;
    },
    getUserFavAction: (state, action) => {
      console.log("action", action.payload);
      state.userFavorite = action.payload;
    },
  },
});

export const { getProfileAction, logOutUserAction, getUserFavAction } = userReducer.actions;

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
export const updateProfileApi = (userUpdate) => {
  return async (dispatch) => {
    try {
      const result = await http.post("/Users/updateProfile", userUpdate);
      console.log("updateProfileApi", result);
      dispatch(getProfileApi());
      alert("Cập nhật dữ liệu thành công!");
    } catch (err) {
      console.log(err);
      alert("Cập nhật dữ liệu không thành công!");
    }
  };
};
export const getProductsFavoriteApi = (
  accessToken = getStore(ACCESS_TOKEN)
) => {
  return async (dispatch) => {
    try {
      let result = await http.get("/Users/getproductfavorite");
      console.log("getProductsFavoriteApi", result.data.content);
      setStoreJson("USER_FAV", result.data.content);
      dispatch(getUserFavAction(result.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fbLoginApi = (fbToken) => {
  return async (dispatch) => {
    try {
      console.log(fbToken);
      const result = await http.post("/Users/facebooklogin", fbToken);
      console.log(result);
      console.log(result.data.content.accessToken);

      // setCookie(ACCESS_TOKEN, result.data.content.accessToken, 30);
      // setStore(ACCESS_TOKEN, result.data.content.accessToken);

      // dispatch(getProfileApi());
      // alert("Đăng nhập thành công!");
      // history.push("/index");
    } catch (err) {
      // alert("Kiểm tra lại email và password");
      // history.push("/login");
      console.log(err);
    }
  };
};
