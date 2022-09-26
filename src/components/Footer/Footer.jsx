import React from "react";
export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="container row">
          <div className="get-help col-4 border-fix">
            <h4>GET HELP</h4>
            <ul>
              <li>Home</li>
              <li>Nice</li>
              <li>Adidas</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="get-help col-4 border-fix">
            <h4>SUPPORT</h4>
            <ul>
              <li>About</li>
              <li>Contact</li>
              <li>Help</li>
              <li>Phone</li>
            </ul>
          </div>
          <div className="get-help col-4 border-fix">
            <h4>REGISTER</h4>
            <ul>
              <li>Register</li>
              <li>Login</li>
            </ul>
          </div>
        </div>
        {/* Cory right */}
        <div className="text-center p-3">
          <p> © 2020 Copyright | Design Theme by Nguyen Minh Hoang </p>
        </div>
      </div>
    </footer>
  );
}
