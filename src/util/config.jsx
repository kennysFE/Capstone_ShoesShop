import axios from "axios";
import { history } from "../index";
export const config = {
  setCookie: (name, value, days) => {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },
  getCookie: (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  //   eraseCookie: (name) => {
  //     document.cookie =
  //       name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  //   },

  getStore: (name) => {
    if (localStorage.getItem(name)) {
      return localStorage.getItem(name);
    }
    return null;
  },
  setStore: (name, value) => {
    localStorage.setItem(name, value);
  },
  setStoreJson: (name, value) => {
    let json = JSON.stringify(value);
    localStorage.setItem(name, json);
  },
  getStoreJson: (name) => {
    if (localStorage.getItem(name)) {
      return JSON.parse(localStorage.getItem(name));
    }
    return null;
  },
  deleteStore: (name) => {
    if (!localStorage) {
      localStorage.removeItem(name);
    }
  },
  ACCESS_TOKEN: "accessToken",
  USER_LOGIN: "userLogin",
};

export const {
  setCookie,
  getCookie,
  getStore,
  setStore,
  getStoreJson,
  setStoreJson,
  ACCESS_TOKEN,
  USER_LOGIN,
} = config;

const DOMAIN = "https://shop.cyberlearn.vn/api";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMCIsIkhldEhhblN0cmluZyI6IjE3LzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NjU5MjAwMDAwMCIsIm5iZiI6MTY0ODIyNzYwMCwiZXhwIjoxNjc2NzM5NjAwfQ.aK-3RvHXQyu6H2-FFiafeSKR4UMCcRmnuDbTT-XIcUU";
/*Cau hinh request cho tat ca api response cho tat ca kqua tra tu api tra ve */
//coi lai interceptor
//Cau hinh domain
export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 30000,
});

http.interceptors.request.use(
  (config) => {
    const token = getStore(ACCESS_TOKEN);
    config.headers = {
      ...config.headers,
      ["Authorization"]: `Bearer ${token}`,
      ["TokenCybersoft"]: TOKEN_CYBERSOFT,
    };
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//cau hinh kqua tra ve
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response.data.message === "Đăng nhập thất bại!") {
      alert("Xin hãy kiểm tra lại email hoặc password");
      history.push("/login");
      return Promise.reject(err);
    }
    if (err.response.data.message === "Email đã được sử dụng!") {
      alert("Email đã được sử dụng! Xin hãy sử dụng email khác");
      history.push("/register");
      return Promise.reject(err);
    }
    if ((err.response.status === 400) | (err.response.status === 404)) {
      history.push("/");
      return Promise.reject(err);
    }
    if ((err.response.status === 401) | (err.response.status === 403)) {
      alert("Token khong hop le vui long dang nhap lai");
      history.push("/login");
      return Promise.reject(err);
    }
  }
);

/**
 * status code
 * 400: tham so gui len khong hop le => ket qua khong tim duoc (Bad Request)
 * 404: tham so gui len nhung khong tim thay => co the bi xoa r (Not Found)
 * 200: thanh cong,OK...,
 * 201: Da duoc tao thanh cong => (Minh da tao roi sau do request tiep thi se tra 201)
 * 401: Khong co quyen truy cap vap api do (Unauthorized - co the do token khong hop le hoac do bi admu chan)
 * 403: Chua du quyen truy cap vao api do (Forbiden - token hop le tuy nhien token do chua du quyen truy cap vao api)
 * 500: Loi xay ra tai server (Nguyen nhan co the FrontEnd gui du lieu khong hop le => backend trong qua trinh xu ly code gay ra loi hoac do backend code bi loi => Error in Server)
 */
