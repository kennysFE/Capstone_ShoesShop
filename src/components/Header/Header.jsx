// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { library } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { clearListCartTempAction } from "../../redux/reducers/productReducer";
import { logOutUserAction } from "../../redux/reducers/userReducer";

export default function Header() {
  const { userLogin } = useSelector((state) => state.userReducer);
  const { cart } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const renderLoginItem = () => {
    if (!userLogin) {
      return (
        <>
          <li className="nav-item">
            <NavLink className="login nav-link text-white" to={"/login"}>
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="register-menu nav-link text-white"
              to={"/register"}
            >
              Register
            </NavLink>
          </li>
        </>
      );
    }
    return (
      <>
        <li className="nav-item">
          <NavLink to={"/profile"} className="nav-link text-white">
            {" "}
            {userLogin.name}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={"/index"}
            onClick={logOut}
            className="nav-link text-white"
          >
            LogOut
          </NavLink>
        </li>
      </>
    );
  };

  const logOut = () => {
    dispatch(logOutUserAction(userLogin));
    dispatch(clearListCartTempAction(cart));
    alert("Đăng xuất hoàn tất");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">
          Shoes Shop
        </NavLink>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        />
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav me-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link " to="/" aria-current="page">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/profile">
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/search">
                Search
              </NavLink>
            </li>
            {renderLoginItem()}

            <li className="nav-item">
              <NavLink className="nav-link " to="/carts" aria-current="page">
                <i class="fa fa-cart-plus"></i> (1)
              </NavLink>
            </li>
          </ul>
          <form className="d-flex my-2 my-lg-0">
            <input
              className="form-control me-sm-2"
              type="text"
              placeholder="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
      <nav className="header">
        <div className="header_link">
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Men
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Women
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Kid
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Sport
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
