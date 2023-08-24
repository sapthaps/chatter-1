import React, { useContext, useEffect, useState } from "react";
import UserAvatar from "./UserAvatar";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { MagnifyingGlass } from "react-loader-spinner";
import { db } from "../firebase";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiSolidComment, BiComment } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

const Post = ({ post }) => {
  const [userData, setUserData] = useState({});
  const { user } = useContext(UserContext);
  const isLiked = post?.likes?.includes(user?.uid);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const likePost = async () => {
    const postRef = doc(db, "chatter-posts", post?.id);

    await updateDoc(postRef, {
      likes: isLiked ? arrayRemove(user?.uid) : arrayUnion(user?.uid),
    });
  };

  const deletePost = async () => {
    const msg = window.confirm("Are you sure you want to delete this post?");
    if (!msg) return;
    await deleteDoc(doc(db, "chatter-posts", post?.id));
    toast.success("Post deleted");
  };

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const docRef = doc(db, "chatter-users", post?.uid);
      const docSnap = await getDoc(docRef);
      setUserData(docSnap.data());
      setLoading(false);
    };

    if (post?.id) {
      getUser();
    }
  }, [post?.id]);

  useEffect(() => {
    const getAllComments = async () => {
      const q = query(
        collection(db, "chatter-comments"),
        where("postId", "==", post?.id)
      );
      const snapshot = await getCountFromServer(q);

      setComments(snapshot.data().count);
    };

    if (post?.id) {
      getAllComments();
    }
  }, [post?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#0096FF"
        />
      </div>
    );
  }

  return (
    <section className="flex flex-col border rounded">
      <div className="flex items-center gap-5 border-b border-blue-200 p-4 bg-gray-100">
        <UserAvatar
          userData={userData}
          size={"50"}
        />
        <div className="flex flex-col">
          <Link
            className="text-blue-600 hover:underline decoration-blue-500 decoration-1 underline-offset-2"
            to={`/profile/${userData?.id}`}
          >
            {userData?.username}
          </Link>
          <p className="text-sm text-gray-400">
            {formatDistanceToNow(post?.date)} ago
          </p>
        </div>
      </div>
      <div className="p-4">{post?.text}</div>
      <div className="flex items-center justify-between border-t border-blue-200 p-4 bg-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {isLiked ? (
              <AiFillHeart
                className="text-pink-500 cursor-pointer"
                onClick={likePost}
              />
            ) : (
              <AiOutlineHeart
                className="text-pink-500 cursor-pointer"
                onClick={likePost}
              />
            )}
            <span>{post?.likes?.length}</span>
          </div>
          <Link to={`/comments/${post?.id}`}>
            <div className="flex items-center gap-1 cursor-pointer">
              {comments ? (
                <BiSolidComment
                  className="text-blue-500"
                  onClick={likePost}
                />
              ) : (
                <BiComment
                  className="text-blue-500"
                  onClick={likePost}
                />
              )}
              <span>{comments}</span>
            </div>
          </Link>
        </div>
        {post?.uid === user?.uid && (
          <FaTrash
            className="text-sm cursor-pointer text-red-600"
            onClick={deletePost}
          />
        )}
      </div>
    </section>
  );
};

export default Post;
