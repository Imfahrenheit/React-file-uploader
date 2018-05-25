import React from 'react'
import {NavLink} from 'react-router-dom'
import '../css/common.css'


const NavBar= () => {
  return <div>
      <nav className="nav-bar" style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div>
          <li className="nav-text">
            <NavLink activeClassName={"active"} exact={true} to="/">
             Home
            </NavLink>
          </li>
        </div>

        <div>
          <li className="nav-text">
            <NavLink activeClassName={"active"} to="/Upload">
              Files
            </NavLink>
          </li>
        </div>
      </nav>
    </div>;
}
export default NavBar