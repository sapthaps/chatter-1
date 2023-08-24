import { createContext, useEffect, useReducer } from "react";
import PostReducer from "../reducer/PostReducer";
import { db } from "../firebase";
import { query, collection, onSnapshot, orderBy } from "firebase/firestore";

export const PostContext = createContext();

const initialState = {
  posts: [],
};

export const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PostReducer, initialState);

  useEffect(() => {
    // Fetch posts
    const getAllPosts = async () => {
      const q = query(collection(db, "chatter-posts"), orderBy("date", "desc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const postList = [];
        querySnapshot.forEach((doc) => {
          postList.push(doc.data());
        });
        dispatch({ type: "GET_POSTS", payload: postList });
      });
    };

    getAllPosts();
  }, []);

  return (
    <PostContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};
