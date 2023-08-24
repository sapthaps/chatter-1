import React, { useEffect, useState } from "react";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import Post from "./Post";
import NewComment from "./NewComment";
import AllComments from "./AllComments";

const Comments = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const getPost = async (id) => {
      const docRef = doc(db, "chatter-posts", id);
      const docSnap = await getDoc(docRef);
      setPost(docSnap.data());
    };
    getPost(postId);
  }, [postId]);

  return (
    <section className="mt-8 max-w-xl mx-auto flex flex-col gap-8">
      <Post post={post} />
      <NewComment post={post} />
      <AllComments />
    </section>
  );
};

export default Comments;
