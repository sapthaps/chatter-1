import React from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Layout = () => {
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Signed out successfully");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <header className="max-w-6xl flex justify-between mx-auto items-center h-12 px-2 border-b border-gray-200 z-10 bg-white">
        <h1 className="font-bold text-xl text-blue-500">Chatter</h1>
        <button
          className="bg-blue-500 text-sm rounded text-white px-3 py-1 hover:bg-blue-600 font-semibold"
          onClick={logout}
        >
          Logout
        </button>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
