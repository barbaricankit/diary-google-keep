import { useNote } from "./notes-context";
import { EditNote } from "./EditNote";
import { useMainNote } from "./main-context";
import { useTags } from "./tags-context";
export function TaggedNotes() {
  //Getting the values from context-files
  const { notes, setNotes, setIsPinned, isEditNote, setIsEditNode } = useNote();
  const { tags, setTags, filterByTag, setFilterByTag } = useTags();
  const { setTitle, setText } = useMainNote();
  const pinHandler = (noteId) => {
    setNotes((prevPinNote) =>
      prevPinNote.map((prevNote) => {
        if (prevNote.noteId === noteId) {
          return {
            ...prevNote,
            pin: false
          };
        }
        return prevNote;
      })
    );
  };
  return (
    <>
      <div className="pinnedNote">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "flex-start"
          }}
        >
          {notes.map(({ noteId, title, body, pin, tag, color }, index) => {
            if (tag === filterByTag) {
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
