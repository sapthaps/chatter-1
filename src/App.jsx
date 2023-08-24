import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import { Suspense, lazy, useContext } from "react";
import { UserContext } from "./context/UserContext";
import { MagnifyingGlass } from "react-loader-spinner";
import Protected from "./components/Protected";
import Comments from "./components/Comments";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const Error = lazy(() => import("./pages/Error"));

function App() {
  const { user } = useContext(UserContext);

  const Public = ({ children }) => {
    if (!user) return children;
    else
      return (
        <Navigate
          to={"/"}
          replace={true}
        />
      );
  };

  return (
    <Router>
      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="MagnifyingGlass-loading"
              wrapperStyle={{}}
              wrapperClass="MagnifyingGlass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
          </div>
        }
      >
        <Routes>
          {/* public */}
          <Route
            path="/login"
            element={
              <Public>
                <Login />
              </Public>
            }
          />
          <Route
            path="/register"
            element={
              <Public>
                <Register />
              </Public>
            }
          />
          {/* protected */}
          <Route
            path="/"
            element={
              // <Protected>
              <Layout />
              // </Protected>
            }
          >
            <Route
              index
              element={
                <Protected>
                  <Home />
                </Protected>
              }
            />
            <Route
              path="profile/:userId"
              element={
                <Protected>
                  <Profile />
                </Protected>
              }
            />
            <Route
              path="comments/:postId"
              element={
                <Protected>
                  <Comments />
                </Protected>
              }
            />
          </Route>
          <Route
            path="*"
            element={<Error />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
