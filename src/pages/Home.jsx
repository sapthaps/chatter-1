import React from "react";
import Sidebar from "../components/Sidebar";
import NewPost from "../components/NewPost";
import PostList from "../components/PostList";

const Home = () => {
  return (
    <section className="max-w-6xl flex mx-auto px-2">
      <div className="w-3/4">
        <NewPost />
        <PostList />
      </div>
      <div className="w-1/4">
        <Sidebar />
      </div>
    </section>
  );
};

export default Home;
