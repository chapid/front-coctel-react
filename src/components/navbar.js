import React from "react";

const Navbar = ({brand}) => {
    return(
        <nav className="navbar bg-dark" data-bs-theme="dark">
            <div className="container">
                <a href="#!" className="navbar-brand">{brand}</a>
            </div>
        </nav>
    );
}

export default Navbar;