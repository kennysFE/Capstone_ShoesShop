import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerApi } from "../../redux/reducers/userReducer";

export default function Register() {
  const dispatch = useDispatch();

  const frm = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
      gender: true,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email không được để trống")
        .email("email không đúng định dạng"),
      password: Yup.string()
        .required("Password không được để trống")
        .min(6, "Password có độ dài từ 6 đến 32 ký tự")
        .max(32, "Password có độ dài từ 6 đến 32 ký tự"),
      name: Yup.string()
        .required("Tên không được bỏ trống")
        .matches(
          /^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*/,
          "Tên không đúng định dạng"
        ),
      phone: Yup.string()
        .required("Số điện thoại được để trống")
        .matches(
          /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
          "Số điện thoại không đúng định dạng"
        )
        .max(10, "Số điện thoại tối đa 10 số"),
      passwordConfirm: Yup.string()
        .required("Password không được để trống")
        .min(6, "Password có độ dài từ 6 đến 32 ký tự")
        .max(32, "Password có độ dài từ 6 đến 32 ký tự"),
    }),
    onSubmit: (values) => {
      // console.log(values);
      dispatch(registerApi(values));
    },
  });

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text m-5">-Register-</h2>
      <hr />
      <form className="row g-3" onSubmit={frm.handleSubmit}>
        <div className="col-md-6 form-floating mb-4">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            onChange={frm.handleChange}
            onBlur={frm.handleBlur}
          />
          <label className="fw-normal fs-6" htmlFor="floatingInput">Email address</label>
          {frm.errors.email ? (
            <span className="text-danger fs-6 fw-lighter fst-italic ms-1 text-capitalize">
              {frm.errors.email}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-6 form-floating mb-4">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={frm.handleChange}
            onBlur={frm.handleBlur}
          />
          <label className="fw-normal fs-6" htmlFor="floatingPassword">Password</label>
          {frm.errors.password ? (
            <span className="text-danger fs-6 fw-lighter fst-italic ms-1 text-capitalize">
              {frm.errors.password}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-6 form-floating mb-4">
          <input
            type="password"
            className="form-control"
            id="passwordConfirm"
            placeholder="Confirm Password"
            onChange={frm.handleChange}
            onBlur={frm.handleBlur}
          />
          <label className="fw-normal fs-6" htmlFor="floatingConfirmPassword">Confirm Password</label>
          {frm.errors.passwordConfirm ? (
            <span className="text-danger fs-6 fw-lighter fst-italic ms-1 text-capitalize">
              {frm.errors.passwordConfirm}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-6 form-floating mb-4">
          <input
            className="form-control"
            id="name"
            placeholder="Name"
            onChange={frm.handleChange}
            onBlur={frm.handleBlur}
          />
          <label className="fw-normal fs-6" htmlFor="name">Name</label>
          {frm.errors.name ? (
            <span className="text-danger fs-6 fw-lighter fst-italic ms-1 text-capitalize">
              {frm.errors.name}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-6 form-floating mb-4">
          <input
            type="tel"
            className="form-control"
            id="phone"
            placeholder="phone"
            onChange={frm.handleChange}
            onBlur={frm.handleBlur}
          />
          <label className="fw-normal fs-6" htmlFor="phone">Phone</label>
          {frm.errors.phone ? (
            <span className="text-danger fs-6 fw-lighter fst-italic ms-1 text-capitalize">
              {frm.errors.phone}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-6 form-floating mb-4">
          <fieldset className="row">
            <legend className="col-form-label col-sm-2 pt-0 ps-3">
              Gender
            </legend>
            <div className="col-sm-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="gender1"
                  value={true}
                />
                <label className="form-check-label" htmlFor="gender1">
                  Male
                </label>
              </div>
            </div>
            <div className="col-sm-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="gender2"
                  value={false}
                />
                <label className="form-check-label" htmlFor="gender2">
                  Female
                </label>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="d-grid mt-4 mb-4">
          <button className="submit ">Submit</button>
        </div>
      </form>
    </div>
  );
}
