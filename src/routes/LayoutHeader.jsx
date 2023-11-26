import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";

function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="p-4 flex justify-between items-center">
      <a className="ml-4">Hello, {user.email}</a>
      <nav className="flex gap-4 ml-4">
        <NavLink
          to="/about"
          end={true}
          className="text-gray-800 px-2 py-1  hover:bg-gray-300"
        >
          About
        </NavLink>
        <NavLink
          to="/notes"
          className="text-gray-800 px-2 py-1  hover:bg-gray-300"
        >
          Notes
        </NavLink>
        <NavLink
          to="/signup"
          className="text-gray-800 px-2 py-1  hover:bg-gray-300"
        >
          Log out
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
