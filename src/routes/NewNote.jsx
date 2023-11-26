import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";
import LayoutHeader from "./LayoutHeader";

function NewNote() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("newNote", JSON.stringify({ title, text }));
  }, [title, text]);

  function handleSaveNote() {
    if (title.trim() === "") {
      setError("The Title field cannot be empty.");
      return;
    }
    const newNote = {
      title: title,
      text: text,
      createdAt: Date.now(),
      authorId: userContext.user?.id,
    };

    saveNoteData(newNote)
      .then(() => {
        navigate("/not");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  const saveNoteData = async (noteData) => {
    try {
      const response = await fetch("http://localhost:5001/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });
      if (!response.ok) {
        throw new Error("Error");
      }
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        <LayoutHeader />
      </div>
      <div className="prose flex flex-col gap-5 ">
        <div className="flex justify-center  mt-8 items-center gap-6 ">
          {" "}
          <Link to="/notes" className="py-2 px-4 mb-5">
            Back
          </Link>
          <h1>New Note</h1>
        </div>
        <input
          className=" py-2 px-4 bg-gray-100 "
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        {error && <p className="error">{error}</p>}
        <textarea
          className=" py-2 px-4 bg-gray-100 "
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className="flex justify-center">
          <button
            className=" py-2 px-4 mb-8 w-20  bg-gray-300  hover:bg-gray-400 text-black"
            onClick={handleSaveNote}
          >
            Save
          </button>
        </div>{" "}
      </div>
    </div>
  );
}

export default NewNote;
