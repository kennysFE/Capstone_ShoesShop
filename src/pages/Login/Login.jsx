import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FacebookLogin } from "react-facebook-login";
import { loginApi } from "../../redux/reducers/userReducer";

export default function Login() {
  const dispatch = useDispatch();

  const frm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email không được bỏ trống")
        .email("Email không đúng định dạng"),
      password: Yup.string()
        .required("Mật khẩu không được bỏ trống")
        .min(6, "Password có độ dài từ 6 đến 32 ký tự")
        .max(32, "Password có độ dài từ 6 đến 32 ký tự"),
    }),
    onSubmit: (values) => {
      dispatch(loginApi(values));
    },
  });

  return (
    <div className="container">
      <div className="form-signin w-100 m-auto">
        <form className="mt-5 mb-5" onSubmit={frm.handleSubmit}>
          <h2 className=" mb-5 fw-semibold text-center">-Please Sign In-</h2>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
            />
            <label htmlFor="floatingInput">Email address</label>
            {frm.errors.email ? (
              <span className="text-danger fs-6 fw-lighter fst-italic ms-1 text-capitalize">
                {frm.errors.email}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
            />
            <label htmlFor="floatingPassword">Password</label>
            {frm.errors.password ? (
              <span className="text-danger fs-6 fw-lighter fst-italic ms-1 text-capitalize">
                {frm.errors.password}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="checkbox mt-4 mb-4">
            <label>
              <input type="checkbox" defaultValue="remember-me" /> Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-dark mt-3 mb-3">
            Sign in
          </button>
          <p className="mt-5 mb-5 text-muted text-center">
            Not a Member? 
            <NavLink to="/register" className="text-muted ms-1">
              Join Us
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}
