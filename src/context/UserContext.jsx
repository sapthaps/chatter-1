import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "../reducer/AuthReducer";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  query,
  collection,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

export const UserContext = createContext();

const initialState = {
  user: null,
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    const unsubscribe = async () => {
      await onAuthStateChanged(auth, (currentUser) => {
        dispatch({ type: "LOGIN", payload: currentUser });
      });
    };

    return () => {
      unsubscribe();
    };
  }, []);

  const userExists = async (username) => {
    const q = query(
      collection(db, "chatter-users"),
      where("username", "==", username)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.size > 0;
  };

  return (
    <UserContext.Provider value={{ ...state, dispatch, userExists }}>
      {children}
    </UserContext.Provider>
  );
};
