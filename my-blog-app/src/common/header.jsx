import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router";
import { logout } from "../features/auth/authSlice";

// import { IoPersonCircleSharp } from "react-icons/io5";

const Header = () => {
  const dispatch = useDispatch();	
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);

  const handleLogout=(e)=>{
	e.preventDefault();
	dispatch(logout());
  }

  return (
    <>
      <div className="px-14 p-7 rounded-b-2xl items-center shadow-xl">
        <div className="flex justify-between items-center">
          <Link to="/" className="font-bold text-lg text-indigo-700">
            The Digital Diaries
          </Link>
          <div className="flex justify-evenly items-center gap-4">
            <NavLink
              to="/my-blogs"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold bg-black rounded-lg py-2 px-4 "
                  : "text-black"
              }
            >
              My Blogs
            </NavLink>
            <NavLink
              to="/write"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold bg-black rounded-lg py-2 px-4 "
                  : "text-black"
              }
            >
              Write
            </NavLink>
            {isLoggedIn ? (
              <>
                <NavLink to="/profile">
                  {/* <IoPersonCircleSharp className="text-5xl" /> */}
				  Profile
                </NavLink>
                <button onClick={handleLogout} className= "font-bold text-red-500 rounded-lg">Log Out</button>
              </>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-semibold bg-black rounded-lg py-2 px-4 "
                    : "text-black"
                }
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export { Header };
