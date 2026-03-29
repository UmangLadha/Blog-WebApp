import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/app/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/features/auth/authSlice";
import DefaultProfile from "../../../images/defaultProfile.png";
import { MdLogout } from "react-icons/md";

interface UserData{
  userFullname:string;
  userEmail:string;
}

const LoggedInUserDetails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user); // getting user from redux
  const [userData, setUserData] = useState<UserData | null>(null);

  // assigning data to state
  useEffect(()=>{
	setUserData(user);
  },[user])

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="w-full md:w-1/3 xl:w-1/4 bg-white shadow-xl shadow-purple-900/5 rounded-2xl border border-gray-100 flex flex-col p-6 relative md:sticky md:top-24 z-10 h-max">
      <div className="flex flex-col items-center text-center gap-4 mb-6">
        <div className="relative">
          <img 
            className="w-24 h-24 rounded-full border-4 border-purple-50 object-cover shadow-sm" 
            src={DefaultProfile} 
            alt="Profile" 
          />
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-2xl text-gray-900">{userData?.userFullname}</h2>
          <p className="text-gray-500 font-medium">{userData?.userEmail}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="w-full font-semibold text-red-600 bg-red-50 hover:bg-red-100 py-3 rounded-xl flex items-center justify-center transition-colors shadow-sm focus:outline-none focus:ring-4 focus:ring-red-50"
      >
        <MdLogout className="mr-2 text-xl" />
        Log Out
      </button>
    </div>
  );
};

export default LoggedInUserDetails;
