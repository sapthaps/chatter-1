import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import UserAvatar from "./UserAvatar";

const Sidebar = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async (userId) => {
      const ref = doc(db, "chatter-users", userId);
      const docSnap = await getDoc(ref);

      setUserData(docSnap.data());
    };
    getUserData(user?.uid);
  }, [user]);

  return (
    <aside className="h-screen mx-auto w-1/4 fixed top-12 z-0 flex flex-col items-center gap-6 px-6 py-10 border-l border-gray-200">
      <UserAvatar
        userData={userData}
        size={"80"}
      />
      <code className="bg-gray-200 px-1 rounded-sm">@{userData?.username}</code>
      <Link to={`/profile/${user?.uid}`}>
        <button className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none font-medium rounded text-sm px-5 py-2 text-center w-full">
          View Profile
        </button>
      </Link>

      <hr className="border border-blue-200 mt-2 w-full" />
    </aside>
  );
};

export default Sidebar;
