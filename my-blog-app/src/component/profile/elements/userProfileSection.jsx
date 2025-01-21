import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../..//redux/features/auth/authSlice";

const UserProfileSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="shadow-md w-full md:w-2/6 border rounded-xl flex justify-between gap-10 flex-col p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="size-24 border rounded-full">
          <img src="/" alt="Profile" />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-medium text-xl">Umang Ladha</h2>
          <p>Umangladha@gmail.com</p>
        </div>
      </div>

      <button
	  type="button"
        onClick={handleLogout}
        className="font-semibold text-white py-2 w-2/5 mx-auto rounded-lg bg-red-600"
      >
        Log Out
      </button>
    </div>
  );
};

export default UserProfileSection;
