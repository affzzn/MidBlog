import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function NavBar() {
  const user = false;

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-xl font-extrabold">
        <Link to="/">MidBlog</Link>
      </h1>

      <div className="flex justify-center items-center space-x-0">
        <p>
          <FaSearch />
        </p>
        <input type="text" placeholder="Search" className="px-3 outline-none" />
      </div>

      <div className="flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <h3>
            <Link to="/write">Write</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}
        {user ? (
          <h3>Profile</h3>
        ) : (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>
    </div>
  );
}

export default NavBar;
