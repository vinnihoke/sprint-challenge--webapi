import React from "react";
import "../../node_modules/materialize-css/dist/css/materialize.min.css";
import "../../node_modules/materialize-css/dist/js/materialize.min.js";
const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-around"
      }}
      className="blue-grey darken-4"
    >
      <div className="nav-wrapper" style={{ maxWidth: "800px", width: "100%" }}>
        <a href="#" className="brand-logo">
          React app ready.
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a href="sass.html">Stuff</a>
          </li>
          <li>
            <a href="badges.html">Other Stuff</a>
          </li>
          <li>
            <a href="collapsible.html">More Stuff</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
