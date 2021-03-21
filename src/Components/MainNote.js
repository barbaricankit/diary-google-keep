import { useState } from "react";
import { useNote } from "./notes-context";
import { v4 } from "uuid";
import { useMainNote } from "./main-context";
import { useTags } from "./tags-context";
export function MainNote() {
  //Taking variables from context files
  const { noteColors } = useMainNote();
  const { tags } = useTags();
  const { setNotes, isPinned, setIsPinned } = useNote();
  //Defining Local variables using useState
  const [isTagSelected, setIsTagSelected] = useState(false);
  const [isColorSelected, setIsColorSelected] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#414347");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  //Saving the note entered in the notes array
  const saveNote = () => {
    //Saving the note only if any of the one field has some value
    if (title !== "" || text !== "") {
      setNotes((prevPinNote) => [
        ...prevPinNote,
        {
          noteId: v4(),
          title: title,
          body: text,
          pin: isPinned,
          tag: selectedTag,
          color: backgroundColor
        }
      ]);
    }
    //Making the field empty again once the note has been saved
    setTitle("");
    setText("");
    setIsPinned(false);
    setSelectedTag("");
    setBackgroundColor("#414347");
  };

  return (
    <>
      <div className="addNote" style={{ backgroundColor: backgroundColor }}>
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
          {
            //If there is any tag selected for the current note, then display the tag with a remove button to remove the tag
            selectedTag !== "" && (
              <p>
                {selectedTag}{" "}
                <button
                  onClick={() => {
                    setSelectedTag("");
                  }}
                >
                  x
                </button>{" "}
              </p>
            )
          }
        </div>
        {/* All the properties which can be given to the note, like color, tags etc */}
        <div className="noteProperties">
          {/* Tag button, if clicked will show all the available tags available for selection */}
          <div className="tagBtnOption">
            <button
              style={{ cursor: "pointer" }}
              onClick={() =>
                isTagSelected ? setIsTagSelected(false) : setIsTagSelected(true)
              }
            >
              Add Tag
            </button>
            {
              //If the tag button is clicked then display the tags which are available for selection
              isTagSelected && (
                <div className="tagLabel">
                  {tags.map((tag, index) => (
                    <div
                      className="tag"
                      key={index + 1}
                      onClick={() => {
                        setSelectedTag(tag);
                        setIsTagSelected(false);
                      }}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              )
            }
          </div>
          {/* Theme button to change the background color, on clicked will show all the available color options */}
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
            {
              //If the theme button is clicked then display the colors which are available
              isColorSelected && (
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
              )
            }
          </div>
          {/* Save button, when clicked will save the notes */}
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
