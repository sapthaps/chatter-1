import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { MagnifyingGlass } from "react-loader-spinner";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simulate a delay of 2 seconds
    const delay = setTimeout(() => {
      setIsLoggedIn(user !== null);
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(delay); // Cleanup the timeout on component unmount
  }, []);

  if (isLoading) {
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

  if (isLoggedIn) {
    return children;
  }

  return (
    <Navigate
      to={"/login"}
      replace={true}
    />
  );
};

export default Protected;
