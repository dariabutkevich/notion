import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";
import LayoutHeader from "./LayoutHeader";

function ViewingNote() {
  const [note, setNote] = useState(null);
  const { user } = useContext(UserContext);
  const { noteId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5001/notes/${noteId}`)
      .then((response) => response.json())
      .then((data) => {
        setNote(data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [noteId]);

  function handleDeleteNote() {
    fetch(`http://localhost:5001/notes/${noteId}`, { method: "DELETE" })
      .then(() => {
        setNote(null);
        window.location.href = "/notes";
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div>
        <LayoutHeader />
      </div>
      <div className="prose gap-5">
        <div className="flex justify-center  mt-8 items-center gap-6 ">
          {" "}
          <Link to="/notes" className="py-2 px-4 mb-5">
            Back
          </Link>
          <h1>{note.title}</h1>
          <Link
            to={`/editnote/${note.id}`}
            className="text-black py-2 px-4 mb-5"
          >
            <span role="img" aria-label="Edit">
              ✍️
            </span>
          </Link>
          <div
            className="py-2 mb-5"
            role="img"
            aria-label="Delete"
            onClick={() => handleDeleteNote(note.id)}
            style={{ cursor: "pointer" }}
          >
            🗑
          </div>
        </div>
        <p className="flex justify-center  items-center gap-6 ">{note.text}</p>
        <p className="flex justify-center  items-center gap-6 ">
          {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default ViewingNote;
