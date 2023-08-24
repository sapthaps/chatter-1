import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  getDoc,
  doc,
  where,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import Sidebar from "../components/Sidebar";
import UserAvatar from "../components/UserAvatar";
import { format, formatDistanceToNow } from "date-fns";
import { MagnifyingGlass } from "react-loader-spinner";

const Profile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user's posts
    const getAllPosts = async () => {
      const q = query(
        collection(db, "chatter-posts"),
        where("uid", "==", userId),
        orderBy("date", "desc")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const postList = [];
        querySnapshot.forEach((doc) => {
          postList.push(doc.data());
        });
        setPosts(postList);
      });
    };

    getAllPosts();
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      const ref = doc(db, "chatter-users", userId);
      const docSnap = await getDoc(ref);

      setUserData(docSnap.data());
      setLoading(false);
    };

    if (userId) getUserData();
  }, [userId]);

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
    <section className="max-w-6xl mx-auto flex gap-8 mb-8 px-2">
      <div className="w-3/4 flex flex-col gap-4 ">
        <div className="max-w-xl">
          <div className="my-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserAvatar
                userData={userData}
                size={"50"}
              />
              <p className="text-xl">{userData?.username}</p>
            </div>
            <p>Joined: {format(userData?.date, "MMMM yy")}</p>
          </div>
          <div className="flex flex-col gap-8">
            {posts?.length === 0 ? (
              <div className="text-center font-bold text-3xl text-blue-300">
                No Posts
              </div>
            ) : (
              posts?.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="w-1/4 ">
        <Sidebar />
      </div>
    </section>
  );
};

export default Profile;
