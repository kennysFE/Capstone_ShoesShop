import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
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
              <NavLink className="nav-link " to="/login" aria-current="page">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to="/register" aria-current="page">
                Register
              </NavLink>
            </li>
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
              <a className="nav-link"  href="#">
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
