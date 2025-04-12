import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/app/hooks/hooks";
import { useNavigate } from "react-router";
import { logout } from "../../../redux/features/auth/authSlice";
import DefaultProfile from "../../../images/defaultProfile.png";

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
    <div className="shadow-md w-full  md:w-2/6 border rounded-xl flex justify-between gap-3 flex-col p-4">
      <div className="flex items-start leading-3 justify-start gap-3">
        <div className="size-20 border rounded-full">
          <img className="w-20 h-20 rounded-full border" src={DefaultProfile} alt="Profile" />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-medium text-xl">{userData?.userFullname}</h2>
          <p>{userData?.userEmail}</p>
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

export default LoggedInUserDetails;
