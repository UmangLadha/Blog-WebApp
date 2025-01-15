import React from "react";
import { NavLink, Link } from "react-router";

const Header = () => {
  return (
    <>
      <div className="px-14 p-7 rounded-b-2xl items-center shadow-xl">
        <div className="flex justify-between items-center">
          <Link to="/">Blog App</Link>
          <div className="flex justify-evenly items-center gap-4">
            <NavLink
              to="/my-blogs"
              className={({ isActive }) =>
                isActive ? "text-blue-700 font-semibold " : "text-black"
              }
            >
              My Blogs
            </NavLink>
            <NavLink
              to="/write"
              className={({ isActive }) =>
                isActive ? "text-blue-700 font-semibold " : "text-black"
              }
            >
              Write
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "text-blue-700 font-semibold " : "text-black"
              }
            >
              Profile
            </NavLink>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export { Header };
