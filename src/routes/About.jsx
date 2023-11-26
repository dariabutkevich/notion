import React, { useContext } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";
import LayoutHeader from "./LayoutHeader";

export default function About() {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center">
      <div>
        <LayoutHeader />
      </div>
      <div className="prose flex flex-col justify-center items-center ">
        <h1 className="mt-8">About me</h1>
        <p>Email: {user.email}</p>
        <p>
          Date sign up: {moment(user.createdAt).format("D.M.YYYY HH:mm:ss")}
        </p>
        <Link to={"/notes"}>
          <button className="mb-8  bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 mt-8">
            Go to notes
          </button>
        </Link>
      </div>
    </div>
  );
}
