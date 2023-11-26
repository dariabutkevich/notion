import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";
import LayoutHeader from "./LayoutHeader";

function Notes() {
  const [notes, setNotes] = useState([]);
  const userContext = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:5001/notes?authorId=${userContext.user?.id}`)
      .then((response) => response.json())
      .then((data) => {
        setNotes(data.reverse());
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [userContext.user?.id]);

  function handleDeleteNote(noteId) {
    fetch(`http://localhost:5001/notes/${noteId}`, { method: "DELETE" })
      .then(() => {
        fetch(`http://localhost:5001/notes?authorId=${userContext.user?.id}`)
          .then((response) => response.json())
          .then((data) => {
            setNotes(data.reverse());
          })
          .catch((error) => {
            console.log("Error", error);
          });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  return (
    <div className="flex flex-col items-center">
      <div>
        <LayoutHeader />
      </div>
      <div className=" prose gap-5">
        <h1 className="flex justify-center mt-8">Notes</h1>
        <div className="flex justify-center">
          <Link to="/newnote">
            <button className="py-2 px-4 mb-8  bg-gray-300  hover:bg-gray-400 text-black">
              Add new note
            </button>
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          {notes.map((note) => (
            <div
              className="flex gap-6  items-center bg-gray-300  hover:bg-gray-400 h-10 pr-5"
              key={note.id}
            >
              <Link to={`/viewingnote/${note.id}`} className="flex-1 px-6 ">
                <p className="font-bold">{note.title}</p>
              </Link>
              <div>{new Date(note.createdAt).toLocaleDateString()}</div>
              <div>
                <Link to={`/editnote/${note.id}`} className="text-black">
                  <span role="img" aria-label="Edit">
                    ✍️
                  </span>
                </Link>
              </div>
              <div
                role="img"
                aria-label="Delete"
                onClick={() => handleDeleteNote(note.id)}
                style={{ cursor: "pointer" }}
                className="text-red-600"
              >
                🗑
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notes;
