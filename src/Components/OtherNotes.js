import { useMainNote } from "./main-context";
import { useNote } from "./notes-context";
import { EditNote } from "./EditNote";

import { useState } from "react";
import { useTags } from "./tags-context";
export function OtherNotes() {
  const { notes, setNotes, setIsPinned, isEditNote, setIsEditNode } = useNote();
  const { setTitle, setText, noteColors } = useMainNote();
  const [isTagSelected, setIsTagSelected] = useState(false);
  const [isColorSelected, setIsColorSelected] = useState(false);
  const [tagSelected, setTagSelected] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#414347");
  const { tags } = useTags();
  const pinHandler = (noteId) => {
    setNotes((prevPinNote) =>
      prevPinNote.map((prevNote) => {
        if (prevNote.noteId === noteId) {
          return {
            ...prevNote,
            pin: true
          };
        }
        return prevNote;
      })
    );
  };
  return (
    <>
      <div className="otherNote">
        {notes.find(({ pin }) => !pin) && (
          <h1 style={{ textAlign: "start", marginLeft: "1rem" }}>
            Other Notes
          </h1>
        )}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "flex-start"
          }}
        >
          {notes.map(({ noteId, title, body, pin, tag, color }, index) => {
            if (!pin) {
              return (
                <div
                  style={{
                    backgroundColor: color,
                    border: "1px solid white",
                    margin: "0.5rem 1rem",
                    padding: "0.5rem 1.5rem",
                    width: "10rem"
                  }}
                  key={index}
                >
                  <button
                    style={{
                      cursor: "pointer",
                      backgroundColor: pin ? "red" : "white"
                    }}
                    onClick={() => pinHandler(noteId)}
                  >
                    Pin
                  </button>
                  <div
                    onClick={() => {
                      setIsEditNode(noteId);
                      setTitle(title);
                      setText(body);
                      setIsPinned(pin);
                    }}
                  >
                    <h1 style={{ wordWrap: "break-word" }}>{title}</h1>
                    <p style={{ wordWrap: "break-word" }}>{body}</p>
                  </div>
                  {tag !== "" && (
                    <p>
                      {tag}{" "}
                      <button
                        onClick={() =>
                          setNotes((prevnotes) =>
                            prevnotes.map((note) =>
                              note.noteId === noteId
                                ? { ...note, tag: "" }
                                : note
                            )
                          )
                        }
                      >
                        x
                      </button>{" "}
                    </p>
                  )}
                  <div className="noteProperties">
                    <div className="tagBtnOption">
                      <button
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          isTagSelected
                            ? setIsTagSelected(false)
                            : setIsTagSelected(true)
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
                  </div>
                </div>
              );
            }
          })}
          <div>
            {isEditNote !== "" &&
              notes.map((note) => {
                if (note.noteId === isEditNote) {
                  return <EditNote note={note} />;
                }
              })}
          </div>
        </div>
      </div>
    </>
  );
}
