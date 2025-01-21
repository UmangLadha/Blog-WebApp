import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router";
import { BsPencilSquare } from "react-icons/bs";

// import { IoPersonCircleSharp } from "react-icons/io5";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <div className="px-14 p-7 rounded-b-2xl items-center shadow-xl">
        <div className="flex justify-between items-center">
          <Link to="/" className="font-bold text-lg text-indigo-700">
            The Digital Diaries
          </Link>
          <div className="flex justify-evenly items-center gap-4 ">
            {isLoggedIn ? (
              <>
                <NavLink
                  to="/write"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-semibold bg-black rounded-lg py-1 px-4 flex items-center gap-2 "
                      : "text-black, flex items-center gap-2 hover:text-purple-600"
                  }
                >
                  <BsPencilSquare />
                  Write
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-semibold bg-black rounded-lg py-1 px-4 flex items-center gap-2 "
                      : "text-black, flex items-center gap-2 hover:text-purple-600"
                  }
                >
                  {/* <IoPersonCircleSharp className="text-5xl" /> */}
                  Profile
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-semibold bg-black rounded-lg py-1 px-4 "
                      : "text-black hover:text-purple-600"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-semibold bg-black rounded-lg py-1 px-4 "
                      : "text-black hover:text-purple-600"
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export { Header };
