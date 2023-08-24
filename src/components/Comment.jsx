import { deleteDoc, doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import UserAvatar from "./UserAvatar";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

const Comment = ({ comment }) => {
  const [userData, setUserData] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(db, "chatter-users", comment?.uid);
      const docSnap = await getDoc(docRef);
      setUserData(docSnap.data());
    };

    if (comment?.uid) getUser();
  }, [comment]);

  const deletePost = async () => {
    const msg = window.confirm("Are you sure you want to delete this comment?");
    if (!msg) return;
    await deleteDoc(doc(db, "chatter-comments", comment?.id));
    toast.success("Comment deleted");
  };

  return (
    <div
      key={comment?.id}
      className="border rounded"
    >
      <div className="flex items-center gap-5 border-b border-blue-200 p-3 bg-gray-100">
        <UserAvatar
          userData={userData}
          size={"30"}
        />
        <div className="flex flex-col">
          <Link
            className="text-blue-600 hover:underline decoration-blue-500 decoration-1 underline-offset-2"
            to={`/profile/${userData?.id}`}
          >
            {userData?.username}
          </Link>
          <p className="text-sm text-gray-400">
            {formatDistanceToNow(comment?.date)} ago
          </p>
        </div>
      </div>
      <div className="p-3 flex items-center justify-between">
        <p>{comment?.text}</p>
        {comment?.uid === user?.uid && (
          <FaTrash
            className="text-sm cursor-pointer text-red-600"
            onClick={deletePost}
          />
        )}
      </div>
    </div>
  );
};

export default Comment;
