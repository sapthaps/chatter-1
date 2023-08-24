import React, { useContext } from "react";
import Post from "./Post";
import { PostContext } from "../context/PostContext";

const PostList = () => {
  const { posts } = useContext(PostContext);

  return (
    <section className="mt-12 max-w-xl mx-auto flex flex-col gap-8 mb-8">
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
    </section>
  );
};

export default PostList;
