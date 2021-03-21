import { useState } from "react";
import { useNote } from "./notes-context";
import { v4 } from "uuid";
import { useMainNote } from "./main-context";
import { useTags } from "./tags-context";
export function EditNote({ note }) {
  const { title, text, setTitle, setText, noteColors } = useMainNote();
  const { tags } = useTags();
  const { setNotes, isPinned, setIsPinned, setIsEditNode } = useNote();
  const [isTagSelected, setIsTagSelected] = useState(false);
  const [isColorSelected, setIsColorSelected] = useState(false);
  const [tagSelected, setTagSelected] = useState(note.tag);
  const [backgroundColor, setBackgroundColor] = useState(note.color);
  console.log(note);
  const saveNote = () => {
    setNotes((prevPinNote) =>
      prevPinNote.map((prevNote) => {
        if (prevNote.noteId === note.noteId) {
          return {
            ...prevNote,

            title: title,
            body: text,
            pin: isPinned,
            tag: tagSelected,
            color: backgroundColor
          };
        }
        return prevNote;
      })
    );

    setTitle("");
    setText("");
    setIsPinned(false);
    setTagSelected("");
    setIsEditNode("");
  };

  return (
    <>
      <div
        className="addNote"
        style={{
          backgroundColor: backgroundColor,
          position: "fixed",
          top: "10rem",
          left: "20rem",
          zIndex: "5"
        }}
      >
        <div className="pinIcon">
          <button
            style={{
              cursor: "pointer",
              backgroundColor: isPinned ? "red" : "white"
            }}
            onClick={() => setIsPinned((prevPin) => (prevPin ? false : true))}
          >
            Pin
          </button>
        </div>
        <div>
          <input
            style={{ backgroundColor: backgroundColor }}
            className="noteInputBox noteTitle"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            style={{ backgroundColor: backgroundColor }}
            className="noteInputBox noteText"
            type="text"
            placeholder="Enter a Note.."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {tagSelected !== "" && (
            <p>
              {tagSelected}{" "}
              <button
                onClick={() => {
                  setTagSelected("");
                }}
              >
                x
              </button>{" "}
            </p>
          )}
        </div>
        <div className="noteProperties">
          <div className="tagBtnOption">
            <button
              style={{ cursor: "pointer" }}
              onClick={() =>
                isTagSelected ? setIsTagSelected(false) : setIsTagSelected(true)
              }
            >
              Add Tag
            </button>
            {isTagSelected && (
              <div className="tagLabel">
                {tags.map((tag, index) => (
                  <div
                    className="tag"
                    key={index + 1}
                    onClick={() => {
                      setTagSelected(tag);
                      setIsTagSelected(false);
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="colorBtnOption">
            <button
              style={{ cursor: "pointer" }}
              onClick={() =>
                isColorSelected
                  ? setIsColorSelected(false)
                  : setIsColorSelected(true)
              }
            >
              Theme
            </button>
            {isColorSelected && (
              <div className="colorLabel">
                {noteColors.map((color, index) => (
                  <div
                    style={{
                      backgroundColor:
                        color === backgroundColor ? "#2f3b53" : "",
                      margin: "0",
                      padding: "1rem 1.5rem",
                      borderRadius: "10px"
                    }}
                    className="tag"
                    key={index}
                    onClick={() => {
                      setBackgroundColor(color);
                      setIsColorSelected(false);
                    }}
                  >
                    {color}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="saveIcon">
            <button onClick={() => saveNote()} className="saveBtn">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
