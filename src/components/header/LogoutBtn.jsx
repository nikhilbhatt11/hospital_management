import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="inline-block px-1 m-0.5 text-sm duration-200 font-serif  hover:border-red-500 hover:border-b-2 sm:text-base sm:px-2 sm:m-2   lg:text-xl"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
