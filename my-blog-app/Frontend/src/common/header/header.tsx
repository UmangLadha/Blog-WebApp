import { useAppSelector } from "../../redux/app/hooks/hooks";
import { NavLink, Link } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { FiUser, FiMenu, FiX } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";
import { useState } from "react";

const Header = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close menu when clicking a link
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-[12vh] px-6 md:px-14 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm z-50 flex items-center justify-between transition-all duration-300">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2.5 text-2xl outline-none font-bold bg-gradient-to-r from-fuchsia-500 to-purple-600 text-transparent bg-clip-text z-50"
        >
          <IoBookOutline className="text-purple-500" />
          Digital Diaries
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex justify-evenly items-center gap-4">
          {isLoggedIn ? (
            <>
              <NavLink
                to="/write"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-5 py-2 rounded-2xl font-medium transition-all ${isActive
                    ? "text-white bg-purple-600 shadow-md shadow-purple-500/30"
                    : "text-gray-700 bg-gray-50 hover:bg-gray-100 hover:text-purple-600"
                  }`
                }
              >
                <BsPencilSquare />
                Write
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-5 py-2 rounded-2xl font-medium transition-all ${isActive
                    ? "text-white bg-purple-600 shadow-md shadow-purple-500/30"
                    : "text-gray-700 bg-gray-50 hover:bg-gray-100 hover:text-purple-600"
                  }`
                }
              >
                <FiUser />
                Profile
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-6 py-2 rounded-full font-medium transition-all ${isActive
                    ? "text-purple-600 bg-purple-50 font-semibold"
                    : "text-gray-600 hover:text-purple-600"
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="px-6 py-2 rounded-full font-medium text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-500/30 transition-all"
              >
                Register
              </NavLink>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-purple-600 focus:outline-none z-50 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* Mobile Navigation Dropdown */}
        <div
          className={`absolute top-[12vh] left-0 w-full bg-white border-b border-gray-100 shadow-lg md:hidden flex flex-col items-center gap-4 transition-all duration-300 ease-in-out origin-top ${isMobileMenuOpen ? "scale-y-100 opacity-100 py-6" : "scale-y-0 opacity-0 h-0 overflow-hidden"
            }`}
        >
          {isLoggedIn ? (
            <>
              <NavLink
                to="/write"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex items-center gap-2 w-11/12 justify-center px-5 py-3 rounded-xl font-medium transition-all ${isActive
                    ? "text-white bg-purple-600 shadow-md"
                    : "text-gray-700 bg-gray-50 hover:bg-gray-100"
                  }`
                }
              >
                <BsPencilSquare />
                Write a Blog
              </NavLink>
              <NavLink
                to="/profile"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex items-center gap-2 w-11/12 justify-center px-5 py-3 rounded-xl font-medium transition-all ${isActive
                    ? "text-white bg-purple-600 shadow-md"
                    : "text-gray-700 bg-gray-50 hover:bg-gray-100"
                  }`
                }
              >
                <FiUser />
                My Profile
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={closeMenu}
                className="w-11/12 text-center py-3 rounded-xl font-medium text-gray-700 bg-gray-50 hover:bg-gray-100"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                onClick={closeMenu}
                className="w-11/12 text-center py-3 rounded-xl font-medium text-white bg-purple-600 hover:bg-purple-700 shadow-md"
              >
                Create Account
              </NavLink>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export { Header };

