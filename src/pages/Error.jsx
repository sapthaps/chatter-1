import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="flex flex-col gap-8 items-center justify-center h-screen">
      <h2 className="font-bold text-5xl text-blue-300">Page Not Found</h2>
      <Link
        to="/"
        className="bg-blue-500 text-md rounded text-white px-4 py-2 hover:bg-blue-600 font-semibold"
      >
        Go to Home
      </Link>
    </section>
  );
};

export default Error;
