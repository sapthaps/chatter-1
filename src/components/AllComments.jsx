import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Comment from "./Comment";

const AllComments = () => {
  const { postId } = useParams();

  const [comments, setComments] = useState([]);
  useEffect(() => {
    // Fetch comments
    const getAllComments = async () => {
      const q = query(
        collection(db, "chatter-comments"),
        where("postId", "==", postId),
        orderBy("date", "asc")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const commentList = [];
        querySnapshot.forEach((doc) => {
          commentList.push(doc.data());
        });
        setComments(commentList);
      });
    };

    getAllComments();
  }, [postId]);

  return (
    <section className="flex flex-col gap-6 mb-8">
      {comments?.map((comment) => (
        <Comment
          comment={comment}
          key={comment?.id}
        />
      ))}
    </section>
  );
};

export default AllComments;
