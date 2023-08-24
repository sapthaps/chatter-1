import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

const Register = () => {
  const { dispatch, userExists } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const usernameExists = await userExists(username);

    if (usernameExists) {
      setLoading(false);
      return toast.error("Username already exists");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        dispatch({ type: "LOGIN", payload: userCred.user });

        setDoc(doc(db, "chatter-users", userCred.user.uid), {
          id: userCred.user.uid,
          username: username.toLowerCase(),
          avatar: "",
          date: Date.now(),
        }).then(() => {
          toast.success("Registration successful");
          setLoading(false);
          navigate("/");
        });
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="border border-gray-200 rounded-lg p-8 flex flex-col items-center gap-2 sm:min-w-[350px]">
        <h1 className="font-bold text-2xl">Register</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="font-semibold"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border border-gray-300 rounded w-full outline-none p-1 px-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded w-full outline-none p-1 px-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded w-full outline-none p-1 px-2"
            />
          </div>
          <button
            disabled={loading ? true : false}
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none font-medium rounded text-sm px-5 py-2 mt-3 text-center flex items-center justify-center w-full"
          >
            {loading ? (
              <>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <p className="text-sm">
          Alreasy have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
