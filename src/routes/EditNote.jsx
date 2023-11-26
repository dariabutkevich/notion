import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import LayoutHeader from "./LayoutHeader";
function EditNote() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { noteId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5001/notes/${noteId}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setText(data.text);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [noteId]);

  function handleSaveNote() {
    const newEditNote = {
      title: title,
      text: text,
    };
    fetch(`http://localhost:5001/notes/${noteId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEditNote),
    })
      .then(() => {
        navigate(`/notes`);
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
      <div className="prose flex flex-col gap-5">
        <div className="flex justify-center  mt-8 items-center gap-6 ">
          <Link to={`/notes`} className="py-2 px-4 mb-5">
            Back
          </Link>
          <h1>Edit Note</h1>
        </div>
        <input
          className=" py-2 px-4 bg-gray-100 "
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
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

export default EditNote;
