import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import Menu from "./Menu";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function NavBar() {
  const { user } = useContext(UserContext);
  console.log(user);

  const [menu, setMenu] = useState(false);
  const showMenu = () => {
    setMenu(!menu);
  };

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

      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
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

      <div onClick={showMenu} className="md:hidden text-lg">
        <p>
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
}

export default NavBar;
