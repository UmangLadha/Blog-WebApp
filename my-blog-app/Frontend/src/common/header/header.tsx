import { useAppSelector } from "../../redux/app/hooks/hooks";
import { NavLink, Link } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";

// import { IoPersonCircleSharp } from "react-icons/io5";

const Header = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[12vh] px-14 p-7 bg-white shadow-xl z-50">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-2xl outline-none font-bold bg-gradient-to-r from-fuchsia-500 to-purple-600 text-transparent bg-clip-text"
          >
            <IoBookOutline className="text-purple-500" />
            The Digital Diaries
          </Link>
          <div className="flex justify-evenly items-center gap-2 ">
            {isLoggedIn ? (
              <>
                <NavLink
                  to="/write"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-semibold bg-black rounded-full py-1 px-4 flex items-center gap-2 "
                      : "text-black, flex items-center gap-2 hover:text-purple-600 hover:bg-neutral-300 px-4 py-1 rounded-full"
                  }
                >
                  <BsPencilSquare />
                  Write
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-semibold bg-black rounded-full py-1 px-4 flex items-center gap-2 "
                      : "text-black flex items-center gap-1 hover:text-purple-600 hover:bg-neutral-200 px-4 py-1 rounded-full "
                  }
                >
                  {/* <IoPersonCircleSharp className="text-5xl" /> */}
                  <FiUser/>
                  Profile
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-semibold bg-black rounded-full py-1 px-4 "
                      : "text-black flex items-center hover:text-purple-600 border hover:bg-neutral-200 px-4 py-1 rounded-full"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-semibold bg-black rounded-full py-1 px-4 "
                      : "text-black flex items-center hover:text-purple-600 border hover:bg-neutral-200 px-4 py-1 rounded-full"
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
