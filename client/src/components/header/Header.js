import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return(
      <nav>
          <div className="container">
              <div className="nav-wrapper">
                  <a href="#" className="brand-logo">Logo</a>
                  <ul id="nav-mobile" className="right hide-on-med-and-down">
                      <li><NavLink to="/">Home</NavLink></li>
                  </ul>
              </div>
          </div>
      </nav>
  )
};

export default Header;
