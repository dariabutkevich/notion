import React from "react";
import { Link } from "react-router-dom";
import LayoutHeader from "./LayoutHeader";

function Page404() {
  return (
    <div className="prose flex flex-col items-center">
      <div>
        <LayoutHeader />
      </div>
      <div>
        <p className="mt-24 font-bold text-3xl">404</p>
        <p className=" font-bold text-3xl">Page not found</p>
        <p className=" font-bold text-3xl">
          Go to page {""}
          <Link to="/about">About</Link>
        </p>
      </div>
    </div>
  );
}

export default Page404;
