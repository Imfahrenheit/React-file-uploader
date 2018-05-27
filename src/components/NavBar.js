import React from "react";
import { NavLink } from "react-router-dom";
import "../css/common.css";

const NavBar = () => {
  return <div>
      <nav className="nav-bar" style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div>
          <li className="nav-text">
            <NavLink activeClassName={"active"} exact={true} to="/">
              <i className="fas fa-home" /> Home
            </NavLink>
          </li>
        </div>

        <div>
          <li className="nav-text">
            <NavLink activeClassName={"active"} to="/Upload">
              <i className="fas fa-images" /> Images
            </NavLink>
          </li>
        </div>
      </nav>
    </div>;
};
export default NavBar;
